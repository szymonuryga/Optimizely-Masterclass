import ContentAreaMapper from '@/components/content-area/mapper'
import OnPageEdit from '@/components/draft/on-page-edit'
import { optimizely } from '@/lib/optimizely/fetch'
import { getValidLocale } from '@/lib/optimizely/utils/language'
import { checkDraftMode } from '@/lib/utils/draft-mode'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

export const revalidate = 0
export const dynamic = 'force-dynamic'

export default async function Page(props: {
  params: Promise<{ key: string; locale: string; version: string }>
}) {
  const isDraftModeEnabled = await checkDraftMode()
  if (!isDraftModeEnabled) {
    return notFound()
  }

  const { locale, version, key } = await props.params
  const locales = getValidLocale(locale)

  const componentData = await optimizely.GetComponentByKey(
    { locales, key, version },
    { preview: true }
  )

  const blocks = componentData.data?._Component?.item

  return (
    <Suspense>
      <OnPageEdit
        version={version}
        currentRoute={`/${locale}/draft/${version}/block/${key}`}
      />
      <ContentAreaMapper blocks={[blocks]} preview />
    </Suspense>
  )
}
