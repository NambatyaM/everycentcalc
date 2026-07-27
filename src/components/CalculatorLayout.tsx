'use client';

import { useState, useCallback, FormEvent, ReactNode } from 'react';

export interface Field {
  name: string;
  label: string;
  prefix?: string;
  suffix?: string;
  placeholder?: string;
  step?: string;
  defaultValue?: string;
  tooltip?: string;
}

interface CalculatorLayoutProps {
  title: string;
  description: string;
  fields: Field[];
  calculate: (values: Record<string, number>) => ReactNode;
}

export default function CalculatorLayout({ title, description, fields, calculate }: CalculatorLayoutProps) {
  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(fields.map((f) => [f.name, f.defaultValue || '']))
  );

  const handleChange = useCallback((name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const numericValues = Object.fromEntries(
    Object.entries(values).map(([k, v]) => [k, parseFloat(v) || 0])
  );

  const hasInput = Object.values(numericValues).some((v) => v > 0);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {fields.map((field) => (
            <div key={field.name} className="flex flex-col">
              <label
                htmlFor={field.name}
                className="text-sm font-medium mb-1.5"
                style={{ color: 'var(--text-secondary)' }}
              >
                {field.label}
                {field.tooltip && (
                  <span className="ml-1 text-xs opacity-50" title={field.tooltip}>ⓘ</span>
                )}
              </label>
              <div className="relative">
                {field.prefix && (
                  <span
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {field.prefix}
                  </span>
                )}
                <input
                  id={field.name}
                  type="number"
                  step={field.step || '1'}
                  min="0"
                  placeholder={field.placeholder || '0'}
                  value={values[field.name]}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className={`w-full rounded-lg border text-base font-medium py-3 focus:outline-none focus:ring-2 transition-colors ${
                    field.prefix ? 'pl-8 pr-4' : 'px-4'
                  } ${field.suffix ? 'pr-12' : ''}`}
                  style={{
                    background: 'var(--bg-secondary)',
                    borderColor: 'var(--border)',
                    color: 'var(--text-primary)',

                  }}
                />
                {field.suffix && (
                  <span
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {field.suffix}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </form>

      {hasInput && (
        <div
          className="rounded-xl border p-6 md:p-8"
          style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)' }}
        >
          {calculate(numericValues)}
        </div>
      )}
    </div>
  );
}
