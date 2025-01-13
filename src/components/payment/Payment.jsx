"use client";

import React from "react";
import { useForm } from "react-hook-form";
import useBookingStore from "@/stores/useBookingStore";

export default function Payment({ onBack, setCurrentView }) {
  const completeReservation = useBookingStore(
    (state) => state.completeReservation
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    mode: "onChange"
  });

  const handlePayment = async () => {
    const success = await completeReservation();

    if (success) {
      if (setCurrentView) {
        setCurrentView("purchased");
      }
    } else {
      console.error("Something went wrong with your reservation. Try again.");
    }
  };

  return (
    <div className="mx-auto bg-black text-white">
      <h2 className="text-2xl font-bold mb-4 text-primary">
        Payment information
      </h2>

      <form onSubmit={handleSubmit(handlePayment)} className="space-y-4">
        <div>
          <label htmlFor="cardNumber" className="block text-sm font-bold mb-1">
            Card number
          </label>
          <input
            {...register("cardNumber", {
              required: "Card number is required.",
              pattern: {
                value: /^[0-9]{13,19}$/,
                message: "Card number must be between 13 and 19 digits."
              }
            })}
            type="text"
            className="w-full text-white border border-gray-400 rounded-md p-3 bg-black focus:border-primary focus:outline-none"
            placeholder="Card number"
          />
          {errors.cardNumber && (
            <p className="text-red-500 text-sm">{errors.cardNumber.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="cardHolder" className="block text-sm font-bold mb-1">
            Kortholder navn
          </label>
          <input
            {...register("cardHolder", {
              required: "Cardholder name is required."
            })}
            type="text"
            className="w-full text-white border border-gray-400 rounded-md p-3 bg-black focus:border-primary focus:outline-none"
            placeholder="Cardholder name"
          />
          {errors.cardHolder && (
            <p className="text-red-500 text-sm">{errors.cardHolder.message}</p>
          )}
        </div>

        <div className="flex space-x-4">
          <div>
            <label
              htmlFor="expiryDate"
              className="block text-sm font-bold mb-1"
            >
              Udløbsdato
            </label>
            <input
              {...register("expiryDate", {
                required: "Expiry date is required.",
                pattern: {
                  value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                  message: "Ugyldig udløbsdato (MM/ÅÅ)."
                }
              })}
              type="text"
              className="w-full text-white border border-gray-400 rounded-md p-3 bg-black focus:border-primary focus:outline-none"
              placeholder="MM/YY"
            />
            {errors.expiryDate && (
              <p className="text-red-500 text-sm">
                {errors.expiryDate.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="cvc" className="block text-sm font-bold mb-1">
              CVC
            </label>
            <input
              {...register("cvc", {
                required: "CVC is required.",
                pattern: {
                  value: /^[0-9]{3}$/,
                  message: "CVC must be 3 digits."
                }
              })}
              type="text"
              className="w-full text-white border border-gray-400 rounded-md p-3 bg-black focus:border-primary focus:outline-none"
              placeholder="CVC"
            />
            {errors.cvc && (
              <p className="text-red-500 text-sm">{errors.cvc.message}</p>
            )}
          </div>
        </div>

        <div className="flex justify-between space-x-4 mt-4">
          <button
            onClick={onBack}
            type="button"
            className="px-10 py-2 border border-primary text-black hover:text-primary rounded-full"
          >
            Back
          </button>
          <button
            type="submit"
            className={`px-10 py-2 bg-primary border border-primary text-white rounded-full ${
              !isValid ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={!isValid}
          >
            Confirm payment
          </button>
        </div>
      </form>
    </div>
  );
}
