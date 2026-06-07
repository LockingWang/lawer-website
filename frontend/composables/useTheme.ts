export type ThemeId = 'blue' | 'navy' | 'green-gold' | 'charcoal'

export const THEMES = [
  {
    id: 'blue' as ThemeId,
    label: '清新藍',
    swatch: '#5789B6',
    description: '親民友善'
  },
  {
    id: 'navy' as ThemeId,
    label: '深邃藍',
    swatch: '#2358A5',
    description: '正式權威'
  },
  {
    id: 'green-gold' as ThemeId,
    label: '墨綠金',
    swatch: '#2E6B4A',
    swatchAccent: '#C8941F',
    description: '沉穩尊貴'
  },
  {
    id: 'charcoal' as ThemeId,
    label: '炭灰藍',
    swatch: '#3F567A',
    description: '現代精練'
  },
] as const

const STORAGE_KEY = 'sallywu-theme'

export function useTheme() {
  const theme = useState<ThemeId>('theme', () => 'blue')

  function applyTheme(id: ThemeId) {
    theme.value = id
    if (import.meta.client) {
      document.documentElement.dataset.theme = id
      localStorage.setItem(STORAGE_KEY, id)
    }
  }

  function initTheme() {
    if (import.meta.client) {
      const saved = localStorage.getItem(STORAGE_KEY) as ThemeId | null
      const valid = THEMES.some(t => t.id === saved)
      applyTheme(valid && saved ? saved : 'blue')
    }
  }

  return { theme, applyTheme, initTheme }
}
