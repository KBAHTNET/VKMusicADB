// @ts-check
'use strict';

function reloadPage() {
  document.cookie = '';
  localStorage['audio_v20_progress'] = 0;
  localStorage['ads.events'] = '';
  window.location.reload();
}

const main1 = () => {
  const target = document.querySelector('.audio_page_player_title_performer');
  let isReloading = false;
  // Create an observer instance.
  const observer = new MutationObserver(function(mutations) {
    if((target?.textContent === 'Реклама' || document.title === 'Реклама') && !isReloading) {
      isReloading = true;
      reloadPage();
    }

    setInterval(() => {
      if(document.title === 'Реклама' && !isReloading) {
        isReloading = true;
        reloadPage();
      }    
    }, 100);
  });
  
  try {
    // Pass in the target node, as well as the observer options.
    if(target) {
      observer.observe(target, {
        attributes:    true,
        childList:     true,
        characterData: true
      });
    }
  } catch {}
}

try {
  main1();
} catch {
  const interval = setInterval(() => {
    try {
      main1();
      clearInterval(interval);
    } catch {}
  }, 1000);
}

/**
 * @type {HTMLSpanElement | null}
 */
const label = document.querySelector('.blind_label._play_blind_label');
if(label && label.textContent === 'Воспроизвести') {
  try {
    label?.click();
  } catch {

  }
} else {
  /**@type {HTMLElement | null}*/
  const label2 = document.querySelector('.top_audio_player_btn.top_audio_player_play._top_audio_player_play');
  try{
    setTimeout(() => {
      label2?.click();
    }, 500);
  } catch {
    const messageBox = `
      <style>
        #vk-adbmessagebox {
        width:60px;
        transition-duration:.4s;
        border-radius:8px;
        background-color:#313131;
        text-align:center;
        cursor:default;
        user-select:none;
        padding:10px;
        margin:5px;
        }
        #vk-adbmessagebox:hover {
        background-color: #97ff7d;
        color:black;
        transition-duration: .4s;
        cursor:pointer;
        }
        .close:hover {
        background-color: #ff5599 !important;
        }
      </style>
      <div style="z-index:10000;border-style:solid;border-width:1px;position:fixed;top:35%;left:35%;justify-items:center;align-items:center;display:grid;grid-template-columns=1fr;grid-template-rows:1fr 1fr; width:400px;height:200px;border-radius:8px;box-shadow: 0 0 4px 2px black; background-color: #262626; color: #ffffff;font-size:16px;">
        <div style="margin:10px;text-align:center;word-break:break-word;">Плагин не смог запустить музыку, т.к. возможно в ваших куки не сохранилась последняя проигранная песня. Плагин может сейчас перейти на страницу с музыкой и запустить первый трек из ваших композиций.</div>
        <div style="display:grid;padding:5px;grid-template-columns:1fr 1fr;justify-items:center;align-items:center;">
          <div id="vk-adbmessagebox" onclick="window.location = 'https://vk.com/music'">Перейти</div>
          <div id="vk-adbmessagebox" class="close" onclick="document.getElementById('1275862756128623056176712609823658095').remove()">Закрыть</div>
        </div>
      </div>
    `;

    const div = document.createElement('div');
    div.id = "1275862756128623056176712609823658095";
    div.style.width = "0px";
    div.style.height = "0px";
    div.style.overflow = "hidden";
    div.innerHTML = messageBox;
    document.body.appendChild(div);
  }
}