'use client';

import { ErrorHandler } from '@/app/(system)/error-handler';
import Complete from '@/app/contact/complete';
import Confirm from '@/app/contact/confirm';
import Input from '@/app/contact/input';
import Sending from '@/app/contact/sending';
import { Violations } from '@/modules/(system)/validators/validator';
import { FormData, FormKey, Step } from '@/modules/contact/model';
import { useState } from 'react';

export default function Contact() {
  const [step, setStep] = useState<Step>('input');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    body: '',
  });
  const [violations, setViolations] = useState<Violations<FormKey>>({});
  const [error, setError] = useState(false);

  return (
    <div className="flex h-screen w-screen flex-col items-center py-10">
      {error && <ErrorHandler />}
      {step === 'input' && (
        <Input
          formData={formData}
          violations={violations}
          onChange={setFormData}
          onNext={() => setStep('confirm')}
        />
      )}
      {step === 'confirm' && (
        <Confirm
          formData={formData}
          onBack={() => setStep('input')}
          onNext={() => setStep('sending')}
        />
      )}
      {step === 'sending' && (
        <Sending
          formData={formData}
          onBack={() => setStep('input')}
          onNext={() => setStep('complete')}
          setViolations={setViolations}
          setError={setError}
        />
      )}
      {step === 'complete' && <Complete />}
    </div>
  );
}
