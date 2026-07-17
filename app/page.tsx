import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import About from '@/components/About'
import ExperienceSection from '@/components/ExperienceSection'
import ProjectsSection from '@/components/ProjectsSection'
import WritingSection from '@/components/WritingSection'
import ContactSection from '@/components/ContactSection'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <ExperienceSection />
        <ProjectsSection />
        <WritingSection />
        <ContactSection />
      </main>
    </>
  )
}
