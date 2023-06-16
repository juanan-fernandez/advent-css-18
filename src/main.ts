const rangeSlider = document.getElementById('pass-len') as HTMLInputElement;
const actionButton = document.querySelector('.btn-generate');
const copyButton = document.querySelector('.input-container__img');

rangeSlider?.addEventListener('change', function () {
	const rangeVal = document.querySelector('.pass-len-text')!;
	rangeVal.textContent = this!.value + ' characters';
});

const ToClipBoard = () => {
	const copyText = document.getElementById('password') as HTMLInputElement;

	if (copyText.value.length > 0) {
		copyText.select();
		copyText.setSelectionRange(0, 99999); // For mobile devices
		navigator.clipboard.writeText(copyText.value).then(() => {
			alert('Copied the text: ' + copyText.value);
		});

		return;
	}
};

copyButton?.addEventListener('click', ToClipBoard);

type PasswordRules = {
	withNumbers: boolean;
	withSymbols: boolean;
	withLowerCase: boolean;
	withUpperCase: boolean;
	withNotSimilar: boolean;
	passwordLen: number;
};

const generatePassword = ({
	withNumbers,
	withSymbols,
	withLowerCase,
	withUpperCase,
	withNotSimilar,
	passwordLen,
}: PasswordRules): string => {
	let result = '';
	let passwordSource: string = '';
	const excludedChars = 'lIioO01';

	if (withNumbers) passwordSource += '1234567890';
	if (withSymbols) passwordSource += "!@#$%^&*()-_=+[]{}|;:,.<>?'";
	if (withLowerCase) passwordSource += 'abcdefghijklmnopqrstuvwxyz';
	if (withUpperCase) passwordSource += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

	if (!passwordSource) return passwordSource;

	if (withNotSimilar)
		passwordSource = passwordSource
			.split('')
			.filter(character => !excludedChars.includes(character))
			.join();

	for (let i = 0; result.length < passwordLen; i++) {
		result += passwordSource[Math.floor(Math.random() * passwordSource.length)];
	}
	return result;
};

actionButton?.addEventListener('click', ev => {
	ev.preventDefault();
	const configPassword: PasswordRules = {
		withNumbers: (document.getElementById('numbers') as HTMLInputElement)!.checked,
		withSymbols: (document.getElementById('symbols') as HTMLInputElement)!.checked,
		withLowerCase: (document.getElementById('lowercase') as HTMLInputElement)!.checked,
		withUpperCase: (document.getElementById('uppercase') as HTMLInputElement)!.checked,
		withNotSimilar: (document.getElementById('notsimilar') as HTMLInputElement)!
			.checked,
		passwordLen: Number(
			(document.getElementById('pass-len') as HTMLInputElement)!.value
		),
	};

	const passwordResult = document.getElementById('password') as HTMLInputElement;
	passwordResult!.value = generatePassword(configPassword);
});
