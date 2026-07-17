import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import ExperienceDetail from '@/components/ExperienceDetail'
import ContactSection from '@/components/ContactSection'
import { EXPERIENCES } from '@/lib/data'

export function generateStaticParams() {
  return EXPERIENCES.map((exp) => ({ slug: exp.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const exp = EXPERIENCES.find((e) => e.slug === slug)
  return { title: exp ? `${exp.name} | Ayan Dadsena` : 'Ayan Dadsena' }
}

export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const exp = EXPERIENCES.find((e) => e.slug === slug)
  if (!exp) notFound()
  const other = EXPERIENCES.find((e) => e.slug !== slug)!

  return (
    <>
      <Nav initialTheme="light" activeOverride="experience" />
      <ExperienceDetail exp={exp} other={other} />
      <ContactSection />
    </>
  )
}
