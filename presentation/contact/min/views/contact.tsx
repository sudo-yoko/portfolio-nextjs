'use client';

import { ErrorHandler } from '@/presentation/(system)/error-handlers/error-handler';
import { FormData } from '@/presentation/(system)/types/form-data';
import { Violations } from '@/presentation/(system)/validators/validator';
import { FormKeys, Step } from '@/presentation/contact/min/models/contact-types';
import Complete from '@/presentation/contact/min/views/complete';
import Confirm from '@/presentation/contact/min/views/confirm';
import Input from '@/presentation/contact/min/views/input';
import Sending from '@/presentation/contact/min/views/sending';
import { useState } from 'react';

export default function Contact() {
  const [step, setStep] = useState<Step>('input');
  const [formData, setFormData] = useState<FormData<FormKeys>>({
    name: '',
    email: '',
    body: '',
  });
  const [violations, setViolations] = useState<Violations<FormKeys>>({});
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
        <Confirm formData={formData} onBack={() => setStep('input')} onNext={() => setStep('sending')} />
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
