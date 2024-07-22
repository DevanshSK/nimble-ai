"use client";
import React, { useState } from "react";

type InitialValuesProps = {
    currentStep: number;
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

const InitialValues: InitialValuesProps = {
    currentStep: 1,
    setCurrentStep: () => undefined,
}

const authContext = React.createContext(InitialValues);

const { Provider } = authContext;

/**
 * AuthContextProvider component that provides authentication context to its children.
 * @param children - The child components to be wrapped by the AuthContextProvider.
 * @returns JSX.Element - The provider component with authentication context values.
 */
export const AuthContextProvider = ({
    children
}: {
    children: React.ReactNode
}) => {
    const [currentStep, setCurrentStep] = useState<number>(
        InitialValues.currentStep
    );

    const values = {
        currentStep, setCurrentStep,
    }

    return <Provider value={values}>{children}</Provider>
}

/**
 * Custom hook to access the authentication context state.
 * @returns The current state from the authentication context.
 */
export const useAuthContextHook = () => {
    const state = React.useContext(authContext);
    return state;
}