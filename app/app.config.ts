export default defineAppConfig({
	ui: {
		tooltip: {
			slots: {
				content: 'bg-[#FFFFFF0F] text-[#F1F1F1] border border-[#FFFFFF26] rounded-lg shadow-lg px-4 py-3 text-sm',
				arrow: 'fill-[#161B22] border-[#736EFE]',
			},
		},
		changelogVersions: {
			slots: {
				badge: 'bg-transparent border-[#00E1FF] border-1 select-none text-[#00E1FF]',
				dotInner: 'bg-[#00E1FF]',
				beam: 'bg-[#00E1FF] absolute start-0 top-0 w-full bg-primary will-change-[height]',
			},
		},
	},
});
