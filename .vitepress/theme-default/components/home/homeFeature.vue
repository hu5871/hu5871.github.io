<template>
    <div v-if="hasFeatures" class="home-features">
    <div class="wrapper">
      <div class="home_container">
        <div class="features">
          <section
            v-for="(feature, index) in features"
            :key="index"
            class="feature"
          >
            <h2 class="title" v-if="feature.title">{{ feature.title }}</h2>
            <p class="details" v-if="feature.details">{{ feature.details }}</p>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {computed} from 'vue';
import {useData} from 'vitepress';


const {frontmatter}=useData()

const frontmatterData=frontmatter.value
const hasFeatures = computed(() => {
  return frontmatterData.features && frontmatterData.features?.length > 0
})

const features = computed(() => {
  return frontmatterData.features ? frontmatterData.features : []
})

</script>


<style lang="scss" scoped>
.home-features {
  margin: 0 auto;
  padding: 2rem 0 2rem;
  max-width: 960px;
}

.home-hero + .home-features {
  padding-top: 0;
}

@media (min-width: 420px) {
  .home-features {
    padding: 2.25rem 0 3rem;
  }

  .home-hero + .home-features {
    padding-top: 0;
  }
}

@media (min-width: 720px) {
  .home-features {
    padding-right: 1.5rem;
    padding-left: 1.5rem;
  }
}

.wrapper {
  padding: 0 1.5rem;
}

.home-hero + .home-features .wrapper {
  border-top: 1px solid var(--c-divider);
  padding-top: 3rem;
}

@media (min-width: 420px) {
  .home-hero + .home-features .wrapper {
    padding-top: 3rem;
  }
}

@media (min-width: 720px) {
  .wrapper {
    padding-right: 0;
    padding-left: 0;
  }
}

.home_container {
  margin: 0 auto;
  max-width: 392px;
}

@media (min-width: 720px) {
  .home_container {
    max-width: 960px;
  }
}

.features {
  display: flex;
  flex-wrap: wrap;
  margin: -20px -24px;
}

.feature {
  flex-shrink: 0;
  padding: 20px 24px;
  width: 100%;
}

@media (min-width: 768px) {
  .feature {
    width: calc(100% / 3);
  }
}

.title {
  margin: 0;
  border-bottom: 0;
  line-height: 1.4;
  font-size: 1.25rem;
  font-weight: 500;
}


.details {
  margin: 0;
  line-height: 1.6;
  font-size: 1rem;
  color: var(--c-text-light);
}

.title + .details {
  padding-top: 0.25rem;
}
</style>