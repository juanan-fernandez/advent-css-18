const actionButton = document.querySelector('.btn-generate');

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

	if (withNotSimilar)
		passwordSource = passwordSource
			.split(',')
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
	console.log(configPassword);
	const passwordResult: HTMLInputElement = document.getElementById(
		'password'
	) as HTMLInputElement;
	passwordResult!.value = generatePassword(configPassword);
});
