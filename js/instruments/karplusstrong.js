const g = require( 'genish.js' ),
      instrument = require( './instrument.js' )

module.exports = function( Gibberish ) {

  const KPS = inputProps => {

    const props = Object.assign( {}, KPS.defaults, inputProps )
    let syn = Object.create( instrument )
    
    let sampleRate = Gibberish.mode === 'processor' ? Gibberish.processor.sampleRate : Gibberish.ctx.sampleRate

    const trigger = g.bang(),
          phase = g.accum( 1, trigger, { max:Infinity } ),
          env = g.gtp( g.sub( 1, g.div( phase, 200 ) ), 0 ),
          impulse = g.mul( g.noise(), env ),
          feedback = g.history(),
          frequency = g.in('frequency'),
          glide = g.in( 'glide' ),
          slidingFrequency = g.slide( frequency, glide, glide ),
          delay = g.delay( g.add( impulse, feedback.out ), g.div( sampleRate, slidingFrequency ), { size:2048 }),
          decayed = g.mul( delay, g.t60( g.mul( g.in('decay'), slidingFrequency ) ) ),
          damped =  g.mix( decayed, feedback.out, g.in('damping') ),
          withGain = g.mul( damped, g.in('gain') )

    feedback.in( damped )

    const properties = Object.assign( {}, KPS.defaults, props )

    Object.assign( syn, {
      properties : props,

      env : trigger,
      phase,

      getPhase() {
        return Gibberish.memory.heap[ phase.memory.value.idx ]
      },
    })

    if( properties.panVoices ) {  
      const panner = g.pan( withGain, withGain, g.in( 'pan' ) )
      syn = Gibberish.factory( syn, [panner.left, panner.right], ['instruments','karplus'], props  )
    }else{
      syn = Gibberish.factory( syn, withGain, ['instruments','karplus'], props )
    }

    return syn
  }
  
  KPS.defaults = {
    decay: .97,
    damping:.2,
    gain: 1,
    frequency:220,
    pan: .5,
    glide:1,
    panVoices:false
  }

  let envCheckFactory = ( syn,synth ) => {
    let envCheck = ()=> {
      let phase = syn.getPhase(),
          endTime = synth.decay * sampleRate

      if( phase > endTime ) {
        synth.disconnectUgen( syn )
        syn.isConnected = false
        Gibberish.memory.heap[ syn.phase.memory.value.idx ] = 0 // trigger doesn't seem to reset for some reason
      }else{
        Gibberish.blockCallbacks.push( envCheck )
      }
    }
    return envCheck
  }

  let PolyKPS = Gibberish.PolyTemplate( KPS, ['frequency','decay','damping','pan','gain', 'glide'], envCheckFactory ) 

  return [ KPS, PolyKPS ]

}
