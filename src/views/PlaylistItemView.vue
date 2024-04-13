<template lang="pug">
main
  //- Video background
  div(
    v-show="!isOverlayShown"
    class="absolute inset-0 flex items-center justify-center -z-20")
    // TODO: Video paused controls?
    div(ref="youtube")


  div(v-show="!hideOverlayRoot")
    //- Preview image
    Transition(name="zoom-and-fade" @after-leave="onAnimationDone")
      div(v-show="isOverlayShown" class="absolute inset-0 flex items-center justify-center -z-10")
        img(:src="playlistItem.thumbnailUrl" alt="Preview" class="object-cover w-full h-full")

    //- Overlay
    Transition(name="fade")
      div(v-show="isOverlayShown" class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-0")

    //- Content
    // TODO: Load this stuff from a TS file or eventually from something dynamic?
    div(class="relative z-10 p-8 font-bold flex flex-col justify-between h-dvh")
      div
        Transition(name="translate-up-and-fade")
          div(v-show="isOverlayShown")
            h1(class="text-8xl text-white") {{ playlistItem.name }}
            h2(class="text-4xl") {{ playlistItem.group }}
            div(class="text-gray-400 flex items-center justify-between space-x-4 border-gray-200 border-t-2 mt-3")
              p(class="text-xl mt-2") {{ playlistItem.party }}
              p(class="text-xl") {{ playlistItem.platform }}
        
            //- A couple of sentences of cool context about the demo.
            p(class="mt-8 italic font-normal text-lg text-gray-300 max-w-2xl") {{ playlistItem.description }}

        Transition(name="fade-fast")
          div(v-show="isOverlayShown")
            button(
                class="mt-8 px-4 py-2 bg-white text-black rounded-md hover:bg-neutral-200 active:bg-neutral-400"
                @click="playDemo"
                ) Play Demo

      //- Footer controls.
      Transition(name="translate-down-and-fade")
        div(v-show="isOverlayShown" class="flex items-center justify-between font-normal pt-4")
          RouterLink(to="#")
            FontAwesomeIcon(:icon="faArrowLeft" class="mr-2")
            | Prev
          div
            input(type="checkbox" class="" v-model="isAutoplayOn")
            label(for="autoplay" class="ml-2 text-sm text-gray-400") Autoplay
          RouterLink(to="#")
            | Next
            FontAwesomeIcon(:icon="faArrowRight" class="ml-2")

  Transition(name="translate-up-and-fade")
    div(v-show="isPauseMenuShown" class="absolute left-0 right-0 top-0 flex items-center justify-between bg-black bg-opacity-70 z-0 text-white p-4")
      RouterLink(to="#")
        FontAwesomeIcon(:icon="faArrowLeft" class="mr-2")
        | Prev
      button(
        class="px-4 py-2 bg-white text-black rounded-md hover:bg-neutral-200 active:bg-neutral-400"
        @click="showInfo"
        ) Show Info
      RouterLink(to="#")
        | Next
        FontAwesomeIcon(:icon="faArrowRight" class="ml-2")
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { PlayerState, usePlayer } from '@vue-youtube/core';
import { Transition, ref } from 'vue';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'

import { testPlaylist, getItemFromPlaylist } from '@/playlist'

const hideOverlayRoot = ref(false);
const isOverlayShown = ref(true);
const isPauseMenuShown = ref(false);

const isAutoplayOn = ref(false);

const youtube = ref();

const playlistItem = ref(getItemFromPlaylist(testPlaylist, 0));

const { togglePlay, onStateChange } = usePlayer(playlistItem.value.youtubeId, youtube, {
  playerVars: {
    // autoplay: 0,
    // controls: 1,
    // playsinline: 1,
  },
});

onStateChange((event) => {
  if (event.data === PlayerState.ENDED) {
    // 
    console.log('Video ended');
  }
  if (event.data === PlayerState.PAUSED) {
    isPauseMenuShown.value = true;
  }
  if (event.data === PlayerState.PLAYING) {
    isPauseMenuShown.value = false;
  }
});

function playDemo() {
  isOverlayShown.value = false;
  togglePlay();
}

function onAnimationDone() {
  hideOverlayRoot.value = true;
}

function showInfo() {
  isPauseMenuShown.value = false;
  isOverlayShown.value = true;
  hideOverlayRoot.value = false;
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.fade-fast-enter-active, .fade-fast-leave-active {
  transition: opacity 0.5s;
}
.fade-fast-enter-from, .fade-fast-leave-to {
  opacity: 0;
}

.zoom-and-fade-enter-active, .zoom-and-fade-leave-active {
  transition: opacity 1s, transform 1s ease;
}
.zoom-and-fade-enter-from, .zoom-and-fade-leave-to {
  opacity: 0;
  transform: scale(1.1);
}

.translate-up-and-fade-enter-active, .translate-up-and-fade-leave-active {
  transition: opacity 0.5s, transform 0.5s;
  transition-timing-function: ease-out;
}
.translate-up-and-fade-enter-from, .translate-up-and-fade-leave-to {
  opacity: 0;
  transform: translateY(-80px);
}

.translate-down-and-fade-enter-active, .translate-down-and-fade-leave-active {
  transition: opacity 0.5s, transform 0.5s;
  transition-timing-function: ease-out;
}
.translate-down-and-fade-enter-from, .translate-down-and-fade-leave-to {
  opacity: 0;
  transform: translateY(80px);
}
</style>