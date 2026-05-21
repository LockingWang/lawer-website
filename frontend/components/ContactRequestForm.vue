<script setup lang="ts">
import { nextTick, reactive, ref } from 'vue'
import {
  emailDisplay,
  emailMailtoHref,
  phoneDisplay,
  phoneTelHref
} from '~/utils/siteContact'
import type { ContactApiSuccess } from '~/utils/contactApi'
import { contactEndpoint } from '~/utils/contactApi'

type ContactFormState = {
  name: string
  phone: string
  email: string
  summary: string
  privacyAccepted: boolean
  /** Honeypot：請勿移除 */
  website: string
}

const state = reactive<ContactFormState>({
  name: '',
  phone: '',
  email: '',
  summary: '',
  privacyAccepted: false,
  website: ''
})

type SubmitStatus = 'idle' | 'sending' | 'success' | 'error'
const submitStatus = ref<SubmitStatus>('idle')

/** 成功態細分（文案用） */
type SuccessMode = 'mock' | 'dry_run' | 'smtp' | 'resend' | 'accepted'
const successMode = ref<SuccessMode>('smtp')

const runtimeConfig = useRuntimeConfig()

const formRef = ref<{
  setErrors?: (errs: { path: string; message: string }[]) => void
} | null>(null)

function emailLooksValid(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)
}

async function validate(form: ContactFormState) {
  if (form.website.trim()) {
    return []
  }
  const errors: { path: string; message: string }[] = []
  if (!form.name.trim()) {
    errors.push({ path: 'name', message: '請填寫姓名。' })
  }
  if (!form.summary.trim()) {
    errors.push({
      path: 'summary',
      message: '請簡述您的諮詢需求，以便我們初步了解案情。'
    })
  }
  const phoneOk = Boolean(form.phone.trim())
  const emailOk = Boolean(form.email.trim())
  if (!phoneOk && !emailOk) {
    errors.push({ path: 'phone', message: '請填寫聯絡電話或 Email 至少其一。' })
    errors.push({ path: 'email', message: '請填寫聯絡電話或 Email 至少其一。' })
  }
  else if (emailOk && !emailLooksValid(form.email.trim())) {
    errors.push({ path: 'email', message: 'Email 格式不正確。' })
  }
  if (!form.privacyAccepted) {
    errors.push({
      path: 'privacyAccepted',
      message: '送出前請勾選同意隱私權政策。'
    })
  }
  return errors
}

function clearFormFields() {
  state.name = ''
  state.phone = ''
  state.email = ''
  state.summary = ''
  state.privacyAccepted = false
  state.website = ''
}

function delay(ms: number) {
  return new Promise<void>(r => setTimeout(r, ms))
}

function focusFirstPath(paths: { path: string }[]) {
  const first = paths[0]?.path
  if (!first) {
    return
  }
  const el = document.querySelector<HTMLElement>(
    `[name="${first}"], #${CSS.escape(first)}`
  )
  el?.focus()
}

async function onSubmit() {
  if (state.website.trim()) {
    await delay(400)
    successMode.value = 'accepted'
    submitStatus.value = 'success'
    return
  }

  const apiBase = String(runtimeConfig.public.apiBase || '').trim()

  submitStatus.value = 'sending'

  if (!apiBase) {
    await delay(500)
    successMode.value = 'mock'
    submitStatus.value = 'success'
    clearFormFields()
    return
  }

  try {
    const url = contactEndpoint(apiBase)
    const body = {
      name: state.name,
      phone: state.phone,
      email: state.email,
      summary: state.summary,
      privacyAccepted: state.privacyAccepted,
      website: state.website
    }
    const data = await $fetch<ContactApiSuccess>(url, {
      method: 'POST',
      body
    })

    if (data.accepted === true) {
      successMode.value = 'accepted'
    }
    else if (data.mail === 'dry_run') {
      successMode.value = 'dry_run'
    }
    else if (data.mail === 'resend') {
      successMode.value = 'resend'
    }
    else {
      successMode.value = 'smtp'
    }
    submitStatus.value = 'success'
    clearFormFields()
  }
  catch (e: unknown) {
    const fe = e as {
      statusCode?: number
      status?: number
      data?: { issues?: { path: string; message: string }[] }
    }
    const status = fe.statusCode ?? fe.status
    const issues = fe.data?.issues

    if (status === 400 && issues?.length) {
      formRef.value?.setErrors?.(issues)
      submitStatus.value = 'idle'
      nextTick(() => focusFirstPath(issues))
      return
    }

    submitStatus.value = 'error'
  }
}

function onFormError(payload: { errors: { path: string; id?: string }[] }) {
  nextTick(() => {
    const id = payload.errors[0]?.id
    if (id) {
      document.getElementById(id)?.focus()
    }
    else {
      focusFirstPath(payload.errors)
    }
  })
}

function startNewMessage() {
  submitStatus.value = 'idle'
  formRef.value?.setErrors?.([])
}
</script>

<template>
  <div>
    <UAlert
      v-if="submitStatus === 'success'"
      class="mb-6"
      color="green"
      variant="soft"
      icon="i-lucide-check-circle"
      :title="successMode === 'mock' ? '已模擬送出（未連後端）' : '留言已送出'"
    >
      <template #description>
        <template v-if="successMode === 'mock'">
          <p class="text-sm leading-relaxed">
            尚未設定環境變數 <code class="rounded bg-surface-muted px-1">NUXT_PUBLIC_API_BASE</code>，因此<strong class="font-medium text-ink">沒有</strong>呼叫後端。若要測試完整流程，請於 <code class="rounded bg-surface-muted px-1">frontend/.env</code> 填入後端網址（例如 <code class="rounded bg-surface-muted px-1">http://127.0.0.1:3001</code>）並重啟前端。
          </p>
        </template>
        <template v-else-if="successMode === 'dry_run'">
          <p class="text-sm leading-relaxed">
            後端已收到請求；目前為 <strong class="font-medium text-ink">MAIL_DRY_RUN</strong> 模式，<strong class="font-medium text-ink">不會</strong>實際寄信。正式環境請關閉該變數並設定 SMTP 或 Resend。
          </p>
        </template>
        <template v-else>
          <p class="text-sm leading-relaxed">
            我們已收到您的留言，將於可安排之時間內以電話或電子郵件回覆（實際作業依事務所內部流程為準）。若您著急，請直接來電
            <a :href="phoneTelHref" class="inline-flex items-center gap-1 font-medium text-brand-700 underline">
              <UIcon name="i-lucide-phone" class="h-4 w-4 shrink-0" aria-hidden="true" />
              {{ phoneDisplay }}
            </a>。
          </p>
        </template>
        <p class="mt-3 text-sm text-ink/75">
          需要其他管道亦可寄信至
          <a :href="emailMailtoHref" class="inline-flex items-center gap-1 break-all font-medium text-brand-700 underline">
            <UIcon name="i-lucide-mail" class="h-4 w-4 shrink-0" aria-hidden="true" />
            {{ emailDisplay }}
          </a>。
        </p>
        <UButton class="mt-3" color="gray" variant="outline" size="sm" @click="startNewMessage">
          填寫新留言
        </UButton>
      </template>
    </UAlert>

    <UAlert
      v-else-if="submitStatus === 'error'"
      class="mb-6"
      color="red"
      variant="soft"
      icon="i-lucide-alert-circle"
      title="目前無法完成送出"
    >
      <template #description>
        <p class="text-sm leading-relaxed">
          可能是網路不穩、後端暫時無法使用或寄信未設定。請改撥
          <a :href="phoneTelHref" class="inline-flex items-center gap-1 font-medium underline">
            <UIcon name="i-lucide-phone" class="h-4 w-4 shrink-0" aria-hidden="true" />
            {{ phoneDisplay }}
          </a>
          ，或寄信至
          <a :href="emailMailtoHref" class="inline-flex items-center gap-1 break-all font-medium underline">
            <UIcon name="i-lucide-mail" class="h-4 w-4 shrink-0" aria-hidden="true" />
            {{ emailDisplay }}
          </a>
          與本所聯繫（企劃 §2.5、§6.5 備援）。
        </p>
        <UButton class="mt-3" color="primary" variant="soft" size="sm" @click="submitStatus = 'idle'">
          返回表單
        </UButton>
      </template>
    </UAlert>

    <UForm
      v-if="submitStatus !== 'success'"
      ref="formRef"
      :state="state"
      :validate="validate"
      class="relative space-y-6"
      @submit="onSubmit"
      @error="onFormError"
    >
      <UAlert
        v-if="!String(runtimeConfig.public.apiBase || '').trim()"
        color="amber"
        variant="soft"
        icon="i-lucide-info"
        title="開發提示"
        description="未設定 NUXT_PUBLIC_API_BASE 時，按下送出僅為前端模擬成功。本機測試後端請設為 http://127.0.0.1:3001（與 backend CORS_ORIGINS 一致）。"
        class="text-sm"
      />

      <p class="text-sm text-ink/75">
        標示
        <span class="text-red-600">*</span>
        為必填；聯絡電話與 Email 請擇一或兩者皆填。
      </p>

      <div class="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
        <label class="text-[0px]">Leave blank</label>
        <input
          v-model="state.website"
          type="text"
          name="website"
          tabindex="-1"
          autocomplete="off"
          class="border-0 bg-transparent p-0 text-transparent"
        >
      </div>

      <UFormGroup label="姓名" name="name" required>
        <UInput v-model="state.name" placeholder="例如：王小明" />
      </UFormGroup>

      <UFormGroup
        label="聯絡電話"
        name="phone"
        help="與 Email 至少擇一填寫。"
      >
        <UInput v-model="state.phone" type="tel" placeholder="例如：0912-345-678" />
      </UFormGroup>

      <UFormGroup label="Email" name="email" help="與電話至少擇一填寫。">
        <UInput v-model="state.email" type="email" placeholder="name@example.com" />
      </UFormGroup>

      <UFormGroup label="諮詢摘要" name="summary" required>
        <UTextarea
          v-model="state.summary"
          :rows="5"
          autoresize
          placeholder="請簡述事實經過、希望諮詢的問題（無需貼上個資或完整身分證字號）。"
        />
      </UFormGroup>

      <UFormGroup name="privacyAccepted" required>
        <UCheckbox v-model="state.privacyAccepted">
          <template #label>
            <span>
              我已閱讀並同意
              <NuxtLink
                to="/privacy"
                target="_blank"
                rel="noopener noreferrer"
                class="font-medium text-brand-600 underline decoration-brand-500/40 underline-offset-2 hover:text-brand-700"
              >隱私權政策</NuxtLink>
              之個資蒐集與利用方式。
            </span>
          </template>
        </UCheckbox>
      </UFormGroup>

      <div class="flex flex-wrap items-center gap-3 border-t border-neutral-sage/25 pt-6">
        <UButton
          type="submit"
          color="primary"
          size="lg"
          class="min-h-[44px]"
          icon="i-lucide-send"
          :loading="submitStatus === 'sending'"
          :disabled="submitStatus === 'sending'"
        >
          送出留言
        </UButton>
        <p class="text-xs text-ink/65">
          送出資料經 HTTPS 至後端驗證與寄信；失敗時請改以電話或 Email 聯繫。
        </p>
      </div>
    </UForm>
  </div>
</template>
