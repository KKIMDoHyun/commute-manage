import dayjs, { Dayjs } from "dayjs";
import { atom } from "jotai";

export const currentAtom = atom<Dayjs>(dayjs());
