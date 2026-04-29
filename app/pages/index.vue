<script setup lang="ts">
useReveal()

const { public: { siteUrl } } = useRuntimeConfig()
const ogImage = `${siteUrl}/og-image.png`
const ogDesc = 'Encuentros de emprendimiento curados. 40–70 personas, ponencias seleccionadas, temática anunciada. Sin barra abierta, sin networking de feria.'

useSeoMeta({
  title: 'Sala 28 — Networking de emprendimiento curado · Barcelona',
  description: ogDesc,
  ogType: 'website',
  ogTitle: 'Sala 28 — Networking de emprendimiento curado · Barcelona',
  ogDescription: ogDesc,
  ogUrl: siteUrl,
  ogImage,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: 'Sala 28 — Networking de emprendimiento curado',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Sala 28 — Networking de emprendimiento curado · Barcelona',
  twitterDescription: ogDesc,
  twitterImage: ogImage,
  robots: 'index, follow',
})

useHead({
  link: [{ rel: 'canonical', href: siteUrl }],
})
</script>

<template>
  <div>
    <TheGrain />
    <TheHeader />
    <main>
      <HeroSection />
      <ManifestoSection />
      <DifferentiatorSection />
      <HowItWorksSection />
      <UpcomingEventsSection />
      <ArchiveSection />
      <TestimonialsSection />
      <MentorsSection />
      <ApplicationForm />
      <FAQSection />
    </main>
    <TheFooter />
  </div>
</template>
