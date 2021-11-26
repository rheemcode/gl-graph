import { Dispatch } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState, RootDispatch } from ".";

export const useAppDispatch = () => useDispatch<Dispatch<RootDispatch>>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector