'use client';

import { ErrorHandler } from '@/app/(system)/error-handler';
import Complete from '@/app/contact/complete';
import Confirm from '@/app/contact/confirm';
import Input from '@/app/contact/input';
import Sending from '@/app/contact/sending';
import { FormData, FormKey, Step } from '@/modules/contact/model';
import { Violations } from '@/modules/validators/validator';
import { useState } from 'react';

export default function Contact() {
  const [step, setStep] = useState<Step>('input');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    body: '',
  });
  const [violations, setViolations] = useState<Violations<FormKey>>({});
  const [exception, setException] = useState(false);

  return (
    <div className="flex h-screen w-screen flex-col items-center py-10">
      {exception && <ErrorHandler />}
      {step === 'input' && (
        <Input
          formData={formData}
          onChange={setFormData}
          violations={violations}
          setStepConfirm={() => setStep('confirm')}
        />
      )}
      {step === 'confirm' && (
        <Confirm
          formData={formData}
          setStepInput={() => setStep('input')}
          setStepSending={() => setStep('sending')}
        />
      )}
      {step === 'sending' && (
        <Sending
          formData={formData}
          setStepComplete={() => setStep('complete')}
          setStepInput={() => setStep('input')}
          setViolations={setViolations}
          setSystemError={setException}
        />
      )}
      {step === 'complete' && <Complete />}
    </div>
  );
}
