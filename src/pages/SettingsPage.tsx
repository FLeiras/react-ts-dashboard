import Toggle from '../components/Toggle';
import Select from '../components/Select';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../context/LanguageContext';
import { useTranslation } from '../hooks/useTranslation';

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();

  return (
    <div className="space-y-6 max-w-xl">
      <h2 className="text-2xl font-bold">{t.settings.title}</h2>

      <section className="rounded-lg border p-4 space-y-4">
        <h3 className="font-medium text-lg">{t.settings.uiPreferences}</h3>

        <Toggle
          label={t.settings.darkMode}
          checked={theme === 'dark'}
          onChange={toggleTheme}
        />

        <Select
          label={t.settings.language}
          value={language}
          onChange={setLanguage}
          options={[
            { value: 'es', label: 'Español' },
            { value: 'en', label: 'English' },
          ]}
        />
      </section>
    </div>
  );
}
