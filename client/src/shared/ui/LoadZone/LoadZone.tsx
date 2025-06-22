import { useState, useRef } from 'react';
import type { DragEvent, InputHTMLAttributes, ChangeEvent } from 'react';
import { CancelButton, classNames } from '@/shared';

import SpinnerIcon from '@/shared/assets/spinner.svg';

import styles from './LoadZone.module.css';

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
	onFileSelected: (file: File) => void;
	onFileRemove: () => void;

	fileName?: string;
	isLoading?: boolean;
	isSuccess?: boolean;
	error?: string | null;
};

export const LoadZone = ({
	onFileSelected,
	onFileRemove,
	fileName,
	isLoading = false,
	isSuccess = false,
	error,
	...inputProps
}: Props) => {
	const [isDragOver, setIsDragOver] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const isFileSelected = Boolean(fileName);

	const handleSelectFile = (file: File) => {
		onFileSelected(file);
	};

	const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (isLoading) {
			return;
		}

		const file = e.target.files?.[0];
		if (file) {
			handleSelectFile(file);
		}

		// сброс value, чтобы можно было загрузить тот же файл снова
		e.target.value = '';
	};

	const handleButtonClick = () => {
		if (!isLoading) {
			fileInputRef.current?.click();
		}
	};

	const handleDrop = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragOver(false);

		if (isLoading) {
			return;
		}

		const file = e.dataTransfer.files?.[0];
		if (file) {
			handleSelectFile(file);
		}
	};

	const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();

		if (!isLoading) {
			setIsDragOver(true);
		}
	};

	const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragOver(false);
	};

	const handleRemoveFile = () => {
		onFileRemove();

		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	};

	return (
		<div
			className={classNames(
				styles.container,
				!isFileSelected && styles.bgEmpty,
				isFileSelected && styles.bgFilled,
				isDragOver && styles.bgDroppable,
				error && styles.bgError,
			)}
			onDrop={handleDrop}
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
		>
			<input
				ref={fileInputRef}
				type="file"
				className={styles.hiddenInput}
				onChange={handleFileInputChange}
				disabled={isFileSelected}
				{...inputProps}
			/>

			<div className={styles.actions}>
				<button
					type="button"
					onClick={handleButtonClick}
					className={classNames(
						styles.uploadButton,
						error && styles.uploadError,
						isSuccess && styles.uploadSuccess,
						isFileSelected && styles.uploadFilled,
					)}
					disabled={isLoading}
					title={error || undefined}
				>
					{isLoading && <SpinnerIcon />}
					{!isLoading && (fileName || 'Загрузить файл')}
				</button>

				{isFileSelected && !isLoading && <CancelButton onClick={handleRemoveFile} />}
			</div>

			{error && <div className={styles.errorMessage}>{error}</div>}

			{!isSuccess && !isFileSelected && !isLoading && !error && (
				<div className={styles.hint}>или перетащите сюда</div>
			)}

			{isFileSelected && !isLoading && !isSuccess && (
				<div className={styles.hint}>файл загружен!</div>
			)}

			{isLoading && <div className={styles.hint}>идет парсинг файла</div>}

			{isSuccess && !error && <div className={styles.hint}>готово!</div>}
		</div>
	);
};
