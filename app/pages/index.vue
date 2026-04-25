<script setup lang="ts">
useReveal()

useSeoMeta({
  title: 'Sala 28 — Networking de emprendimiento curado · Barcelona',
  description: 'Encuentros de emprendimiento curados. 40–70 personas, ponencias seleccionadas, temática anunciada. Sin barra abierta, sin networking de feria.',
  ogTitle: 'Sala 28',
  ogDescription: 'Encuentros de emprendimiento curados. Barcelona, desde 2026.',
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
