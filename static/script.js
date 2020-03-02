const voiceAudioElement = document.getElementById('voice-demo-audio');
const voiceDemoDataToggle = document.getElementById('voice-switch-freq');
let voiceAudica = null;

const setUpVoiceDemo = () => {
  const voiceDemoDiv = document.getElementById('voice-demo-vis');
  for (let i = 0; i < 128; i++) {
    const div = document.createElement('div');
    div.classList.add('voice-demo-div');
    voiceDemoDiv.appendChild(div);
  }
}

let VOICE_DEMO_PLAYING = false;

document.addEventListener('DOMContentLoaded', () => {
  setUpVoiceDemo();


  const runVoiceDemoLoop = () => {
    if (VOICE_DEMO_PLAYING) {
      window.requestAnimationFrame(runVoiceDemoLoop);
    }

    const voiceDemoDiv = document.getElementById('voice-demo-vis');

    const data = voiceAudica.getData();
    const nodes = Array.from(voiceDemoDiv.querySelectorAll('.voice-demo-div'));

    for(let i = 0; i < nodes.length; i++) {
      nodes[i].style = `height: ${data[i]}px; width: 3px; background-color: white;`;
    }

  }

  voiceAudioElement.addEventListener('play', () => {
    VOICE_DEMO_PLAYING = true;
    if (!voiceAudica) {
      voiceAudica = audica({
        element: voiceAudioElement,
        size: 128
      });
    }
    runVoiceDemoLoop();
  });
  voiceAudioElement.addEventListener('pause', () => {
    VOICE_DEMO_PLAYING = false;
  });

  voiceDemoDataToggle.addEventListener('click', () => {
    if (voiceAudica.options.dataType === 'hz') {
      voiceAudica.setDataType('time');
      voiceDemoDataToggle.innerHTML = 'Show Frequency Data';

    } else {
      voiceAudica.setDataType('hz');
      voiceDemoDataToggle.innerHTML = 'Show Byte Time Data';
    }
  });


});