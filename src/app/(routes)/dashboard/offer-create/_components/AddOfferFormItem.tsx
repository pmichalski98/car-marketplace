import React, { HTMLInputTypeAttribute, InputHTMLAttributes } from "react"
import { TargetFieldName } from "aws-sdk/clients/iot"
import { Star } from "lucide-react"
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
      engineCapacity: number
      enginePower: number
      vin: string
   }>
   name:
      | "title"
      | "description"
      | "mileage"
      | "transmission"
      | "manufacturer"
      | "model"
      | "fuelType"
      | "prodYear"
      | "engineCapacity"
      | "enginePower"
      | "vin"
      | "color"
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
   const isNumber = type === "number"

   return (
      <>
         <Label htmlFor={name}>{title}</Label>
         <Input
            id={name}
            maxLength={50}
            placeholder={placeholder}
            type={type}
            autoCapitalize="none"
            autoCorrect="off"
            disabled={isSubmitting}
            {...register(name, { valueAsNumber: isNumber })}
         />
         {error && <ErrorTooltip errorMsg={error.message} />}
      </>
   )
}

export default AddOfferFormItem
