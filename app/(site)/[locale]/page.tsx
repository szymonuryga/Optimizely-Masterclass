import ContentAreaMapper from '@/components/content-area/mapper'
import { optimizely } from '@/lib/optimizely/fetch'
import { getValidLocale } from '@/lib/optimizely/utils/language'
import { generateAlternates } from '@/lib/utils/metadata'
import { Metadata } from 'next'
import { Suspense } from 'react'

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await props.params
  const locales = getValidLocale(locale)
  const pageResp = await optimizely.GetStartPage({ locales })
  const page = pageResp.data?.StartPage?.item
  if (!page) {
    return {}
  }

  return {
    title: page.title,
    description: page.shortDescription || '',
    keywords: page.keywords ?? '',
    alternates: generateAlternates(locale, '/'),
  }
}

export default async function HomePage(props: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await props.params
  const locales = getValidLocale(locale)
  const pageResponse = await optimizely.GetStartPage({ locales })

  const startPage = pageResponse.data?.StartPage?.item
  const blocks = (startPage?.blocks ?? []).filter(
    (block) => block !== null && block !== undefined
  )

  return (
    <>
      <Suspense>
        <ContentAreaMapper blocks={blocks} />
      </Suspense>
    </>
  )
}
