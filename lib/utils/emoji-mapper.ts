import { Category } from '@/types'

export function getCategoryEmoji(categories: Category[]): string {
  // カテゴリの優先順位に基づいて絵文字を返す
  if (categories.some(c => c.id === 'welfare-health')) {
    return '🌿'
  }
  if (categories.some(c => c.id === 'tourism-culture')) {
    return '🏯'
  }
  if (categories.some(c => c.id === 'administration')) {
    return '🤖'
  }
  if (categories.some(c => c.id === 'education-children')) {
    return '🍱'
  }
  if (categories.some(c => c.id === 'agriculture')) {
    return '🚜'
  }
  if (categories.some(c => c.id === 'environment')) {
    return '🌳'
  }
  if (categories.some(c => c.id === 'industry-economy')) {
    return '🏭'
  }
  if (categories.some(c => c.id === 'disaster-management')) {
    return '🚨'
  }
  if (categories.some(c => c.id === 'civil-engineering')) {
    return '🏗️'
  }
  if (categories.some(c => c.id === 'crime-prevention')) {
    return '🛡️'
  }
  return '📋'
}

