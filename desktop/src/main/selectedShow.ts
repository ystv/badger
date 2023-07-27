import { CompleteShowType } from "../common/types";

export let selectedShow: CompleteShowType | null = null;

export async function setSelectedShow(show: CompleteShowType) {
  selectedShow = show;
}
