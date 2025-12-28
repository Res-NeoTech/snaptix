import { defineStore } from 'pinia';

export const useConversationStore = defineStore('conversation', {
	state: () => ({
		prompt: null as unknown as string,
		response: null as unknown as string,
	}),
});
