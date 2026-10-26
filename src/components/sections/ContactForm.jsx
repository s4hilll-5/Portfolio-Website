import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { AlertCircle, ArrowRight, CheckCircle2, Info, Loader2 } from 'lucide-react'
import { profile } from '../../data/profile'

/*
 * Contact form with client-side validation.
 *
 * Sending:
 * - If VITE_CONTACT_ENDPOINT is set (e.g. a Formspree form URL), the form
 *   POSTs JSON there and only reports success when the service confirms it.
 * - Otherwise it opens the visitor's email app with the message pre-filled.
 *   Nothing is "sent" by the site itself, and the UI says so.
 */

const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT?.trim() || ''
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validate(values) {
  const errors = {}
  if (values.name.trim().length < 2) errors.name = 'Please enter your name.'
  if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = 'Please enter a valid email address.'
  if (values.message.trim().length < 10) errors.message = 'Please write a message of at least 10 characters.'
  return errors
}

const fieldClass = (hasError) =>
  `peer w-full rounded-2xl border bg-white/[0.03] px-4 pb-3 pt-6 text-[0.98rem] text-fg outline-none transition-[border-color,background-color,box-shadow] duration-300 placeholder:text-transparent focus:bg-white/[0.05] ${
    hasError
      ? 'border-rose-400/60 focus:shadow-[0_0_0_4px_rgba(251,113,133,0.12)]'
      : 'border-line-strong hover:border-white/20 focus:border-violet/70 focus:shadow-[0_0_0_4px_rgba(139,92,246,0.15)]'
  }`

const labelClass =
  'pointer-events-none absolute left-4 top-4 origin-left text-[0.95rem] text-muted transition-all duration-200 peer-focus:top-2 peer-focus:text-[0.7rem] peer-focus:tracking-wide peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[0.7rem] peer-[:not(:placeholder-shown)]:tracking-wide'

export default function ContactForm() {
  const [values, setValues] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState({ type: 'idle', message: '' })

  const update = (field) => (event) => {
    const next = { ...values, [field]: event.target.value }
    setValues(next)
    if (touched[field]) setErrors(validate(next))
  }

  const blur = (field) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    setErrors(validate(values))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const found = validate(values)
    setErrors(found)
    setTouched({ name: true, email: true, message: true })
    if (Object.keys(found).length) {
      const firstInvalid = ['name', 'email', 'message'].find((key) => found[key])
      document.getElementById(`contact-${firstInvalid}`)?.focus()
      return
    }

    const payload = {
      name: values.name.trim(),
      email: values.email.trim(),
      message: values.message.trim(),
    }

    if (ENDPOINT) {
      setStatus({ type: 'sending', message: '' })
      try {
        const response = await fetch(ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!response.ok) throw new Error(`Request failed with ${response.status}`)
        setStatus({ type: 'success', message: 'Thanks — your message was delivered. I’ll reply by email.' })
        setValues({ name: '', email: '', message: '' })
        setTouched({})
      } catch {
        setStatus({
          type: 'error',
          message: `The message couldn’t be sent right now. Please email ${profile.email} directly.`,
        })
      }
      return
    }

    // No backend configured: hand off to the visitor's email app.
    const subject = encodeURIComponent(`Portfolio enquiry from ${payload.name}`)
    const body = encodeURIComponent(`${payload.message}\n\n— ${payload.name}\n${payload.email}`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
    setStatus({
      type: 'handoff',
      message:
        'Your email app should open with this message ready. It’s only sent once you press send there — this site doesn’t send email on its own.',
    })
  }

  const statusStyles = {
    success: 'border-emerald-400/25 bg-emerald-400/[0.07] text-emerald-100',
    error: 'border-rose-400/30 bg-rose-400/[0.07] text-rose-100',
    handoff: 'border-cyan/25 bg-cyan/[0.06] text-cyan-50',
  }
  const StatusIcon = { success: CheckCircle2, error: AlertCircle, handoff: Info }[status.type]

  return (
    <form noValidate onSubmit={handleSubmit} className="space-y-4" aria-describedby="contact-form-note">
      <div className="grid gap-4 sm:grid-cols-2">
        {[
          { id: 'name', label: 'Your name', type: 'text', autoComplete: 'name' },
          { id: 'email', label: 'Email address', type: 'email', autoComplete: 'email' },
        ].map((field) => (
          <div key={field.id}>
            <div className="relative">
              <input
                id={`contact-${field.id}`}
                name={field.id}
                type={field.type}
                autoComplete={field.autoComplete}
                placeholder={field.label}
                value={values[field.id]}
                onChange={update(field.id)}
                onBlur={blur(field.id)}
                aria-invalid={Boolean(touched[field.id] && errors[field.id])}
                aria-describedby={touched[field.id] && errors[field.id] ? `contact-${field.id}-error` : undefined}
                className={fieldClass(touched[field.id] && errors[field.id])}
              />
              <label htmlFor={`contact-${field.id}`} className={labelClass}>
                {field.label}
              </label>
            </div>
            {touched[field.id] && errors[field.id] ? (
              <p id={`contact-${field.id}-error`} className="mt-2 pl-1 text-xs text-rose-300">
                {errors[field.id]}
              </p>
            ) : null}
          </div>
        ))}
      </div>

      <div>
        <div className="relative">
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            placeholder="Tell me about your idea"
            value={values.message}
            onChange={update('message')}
            onBlur={blur('message')}
            aria-invalid={Boolean(touched.message && errors.message)}
            aria-describedby={touched.message && errors.message ? 'contact-message-error' : undefined}
            className={`${fieldClass(touched.message && errors.message)} resize-y`}
          />
          <label htmlFor="contact-message" className={labelClass}>
            Tell me about your idea
          </label>
        </div>
        {touched.message && errors.message ? (
          <p id="contact-message-error" className="mt-2 pl-1 text-xs text-rose-300">
            {errors.message}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <p id="contact-form-note" className="max-w-xs text-xs leading-relaxed text-subtle">
          {ENDPOINT
            ? 'Messages are delivered through a form service and answered by email.'
            : 'No email service is connected yet, so sending opens your email app with the message filled in.'}
        </p>
        <button
          type="submit"
          disabled={status.type === 'sending'}
          className="group inline-flex min-h-12 shrink-0 items-center justify-center gap-2.5 rounded-full bg-fg px-6 text-[0.95rem] font-medium text-ink transition-[box-shadow,opacity] duration-500 hover:shadow-[0_10px_40px_-8px_rgba(139,92,246,0.65)] disabled:opacity-60"
        >
          {status.type === 'sending' ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending…
            </>
          ) : (
            <>
              {ENDPOINT ? 'Send message' : 'Compose email'}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </>
          )}
        </button>
      </div>

      <div aria-live="polite" role="status">
        <AnimatePresence mode="wait">
          {StatusIcon && status.message ? (
            <motion.p
              key={status.type}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`flex gap-3 rounded-2xl border px-4 py-3 text-sm leading-relaxed ${statusStyles[status.type]}`}
            >
              <StatusIcon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              {status.message}
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>
    </form>
  )
}
