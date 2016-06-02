<template>
  <div id="app">
    <a v-link="{ path: '/' }">Search</a>
    <a v-link="{ path: '/collection' }">Collection</a>
    <a v-link="{ path: '/decks' }">Decks</a>
    <a v-link="{ path: '/import' }">Import</a>
    <router-view></router-view>
  </div>
</template>
