// "use client"
//
// import React from 'react'
// import { voiceOptions, voiceCategories } from '../lib/constants'
//
// type VoiceKey = keyof typeof voiceOptions
//
// type VoiceSelectorProps = {
//   value: VoiceKey | string
//   onChange: (val: VoiceKey | string) => void
// }
//
// export default function VoiceSelector({ value, onChange }: VoiceSelectorProps) {
//   return (
//     <div>
//       <label className="form-label mb-3 block">Choose Assistant Voice</label>
//
//       <div className="space-y-4">
//         <div>
//           <div className="text-sm font-medium text-gray-700 mb-2">Male Voices</div>
//           <div className="grid grid-cols-3 gap-3">
//             {voiceCategories.male.map((key) => {
//               const v = voiceOptions[key as VoiceKey]
//               const selected = value === key
//               return (
//                 <button
//                   key={key}
//                   type="button"
//                   onClick={() => onChange(key)}
//                   className={selected ? 'voice-selector-option-selected' : 'voice-selector-option'}
//                   aria-pressed={selected}
//                 >
//                   <div className="font-semibold">{v.name}</div>
//                   <div className="text-xs text-gray-600">{v.description}</div>
//                 </button>
//               )
//             })}
//           </div>
//         </div>
//
//         <div>
//           <div className="text-sm font-medium text-gray-700 mb-2">Female Voices</div>
//           <div className="grid grid-cols-2 gap-3">
//             {voiceCategories.female.map((key) => {
//               const v = voiceOptions[key as VoiceKey]
//               const selected = value === key
//               return (
//                 <button
//                   key={key}
//                   type="button"
//                   onClick={() => onChange(key)}
//                   className={selected ? 'voice-selector-option-selected' : 'voice-selector-option'}
//                   aria-pressed={selected}
//                 >
//                   <div className="font-semibold">{v.name}</div>
//                   <div className="text-xs text-gray-600">{v.description}</div>
//                 </button>
//               )
//             })}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

'use client';

import React from 'react';
import { voiceCategories, voiceOptions } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { VoiceSelectorProps } from '@/types';

const VoiceSelector = ({ value, onChange, disabled, className }: VoiceSelectorProps) => {
    return (
        <div className={cn('space-y-6', className)}>
            <RadioGroup
                value={value}
                onValueChange={onChange}
                disabled={disabled}
                className="space-y-8"
            >
                {/* Male Voices */}
                <div className="space-y-4">
                    <h4 className="text-sm font-medium text-[#777]">Male Voices</h4>
                    <div className="voice-selector-options">
                        {voiceCategories.male.map((voiceId) => {
                            const voice = voiceOptions[voiceId as keyof typeof voiceOptions];
                            const isSelected = value === voiceId;
                            return (
                                <Label
                                    key={voiceId}
                                    className={cn(
                                        'voice-selector-option',
                                        isSelected ? 'voice-selector-option-selected' : 'voice-selector-option-default',
                                        disabled && 'voice-selector-option-disabled'
                                    )}
                                >
                                    <RadioGroupItem value={voiceId} id={voiceId} className="sr-only" />
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2">
                                            <div className={cn(
                                                "w-4 h-4 rounded-full border flex items-center justify-center",
                                                isSelected ? "border-[#663820]" : "border-gray-300"
                                            )}>
                                                {isSelected && <div className="w-2 h-2 rounded-full bg-[#663820]" />}
                                            </div>
                                            <span className="font-bold text-[#212a3b]">{voice.name}</span>
                                        </div>
                                        <p className="text-xs text-[#777] leading-relaxed">
                                            {voice.description}
                                        </p>
                                    </div>
                                </Label>
                            );
                        })}
                    </div>
                </div>

                {/* Female Voices */}
                <div className="space-y-4">
                    <h4 className="text-sm font-medium text-[#777]">Female Voices</h4>
                    <div className="voice-selector-options">
                        {voiceCategories.female.map((voiceId) => {
                            const voice = voiceOptions[voiceId as keyof typeof voiceOptions];
                            const isSelected = value === voiceId;
                            return (
                                <Label
                                    key={voiceId}
                                    className={cn(
                                        'voice-selector-option',
                                        isSelected ? 'voice-selector-option-selected' : 'voice-selector-option-default',
                                        disabled && 'voice-selector-option-disabled'
                                    )}
                                >
                                    <RadioGroupItem value={voiceId} id={voiceId} className="sr-only" />
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2">
                                            <div className={cn(
                                                "w-4 h-4 rounded-full border flex items-center justify-center",
                                                isSelected ? "border-[#663820]" : "border-gray-300"
                                            )}>
                                                {isSelected && <div className="w-2 h-2 rounded-full bg-[#663820]" />}
                                            </div>
                                            <span className="font-bold text-[#212a3b]">{voice.name}</span>
                                        </div>
                                        <p className="text-xs text-[#777] leading-relaxed">
                                            {voice.description}
                                        </p>
                                    </div>
                                </Label>
                            );
                        })}
                    </div>
                </div>
            </RadioGroup>
        </div>
    );
};

export default VoiceSelector;