<template>
  <PageWrapper>
    <div>
      <h3>To już jest koniec.</h3>
      <h4>Gdzie znajdziesz swój prezent</h4>
      <h4>dowiesz się odczytując co jest zapisane w poniższej ramce...</h4>
    </div>
    <div class="text-container">
      <div>ywytomokoL arotua ecżąisk W</div>
      <div>.ywytom enżór anżom ćźelandO</div>
      <div>atarb ujokop w zseizdjanz ęt ęrutkeL</div>
      <div>.atrawzc atseizdyzrt anorts ejyrk oc źdwarps -</div>
    </div>
  </PageWrapper>
</template>

<script setup lang="ts">
import PageWrapper from 'src/components/PageWrapper.vue';
</script>

<style lang="scss">
.text-container {
  border: 1px solid black;
  transform: scaleY(-1) rotate(45deg) skew(30deg, 2deg);
  color: rgba(202, 193, 193, 0.205);
  font-size: 14px;
  text-decoration: overline underline line-through;
  pointer-events: none;
}
</style>
