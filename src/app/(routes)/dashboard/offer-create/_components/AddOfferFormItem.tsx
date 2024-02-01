import React, { HTMLInputTypeAttribute, InputHTMLAttributes } from "react"
import { TargetFieldName } from "aws-sdk/clients/iot"
import {
   ControllerFieldState,
   ControllerRenderProps,
   FieldError,
   FieldPath,
   FieldValues,
   RegisterOptions,
   UseFormRegister,
   UseFormRegisterReturn,
   UseFormStateReturn,
   UseFormWatch,
} from "react-hook-form"

import ErrorTooltip from "@/components/ui/error-tooltip"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface AddOfferFormItemProps {
   title: string
   isSubmitting: boolean
   register: UseFormRegister<{
      title: string
      description: string
      mileage: number
      transmission: string
      manufacturer: string
      model: string
      fuelType: string
      prodYear: number
      color: string
      price: number
      sellersCity: string
      sellersZip: string
   }>
   name:
      | "title"
      | "color"
      | "description"
      | "mileage"
      | "transmission"
      | "manufacturer"
      | "model"
      | "fuelType"
      | "prodYear"
      | "price"
      | "sellersCity"
      | "sellersZip"
   error: FieldError | undefined
   type: HTMLInputTypeAttribute
   placeholder: string
}

function AddOfferFormItem({
   title,
   isSubmitting,
   register,
   type,
   name,
   error,
   placeholder,
}: AddOfferFormItemProps) {
   type
   return (
      <>
         <Label htmlFor={name}>{title}</Label>
         <Input
            id={name}
            placeholder={placeholder}
            type={type}
            autoCapitalize="none"
            autoCorrect="off"
            disabled={isSubmitting}
            {...register(name)}
         />
         {error && <ErrorTooltip errorMsg={error.message} />}
      </>
   )
}

export default AddOfferFormItem
