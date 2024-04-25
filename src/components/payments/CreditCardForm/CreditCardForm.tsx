import {
  CardNumberTextField,
  ExpirationDateTextField,
  OwnerNameTextField,
  PreviewCreditCard,
} from '@components/payments';

import CardBrandTextField from '@components/payments/@cardBrand/CardBrandTextField/CardBrandTextField';
import CardPasswordTextField from '@components/payments/@cardPassword/CardPasswordTextField/CardPasswordTextField';
import CVCNumberTextField from '@components/payments/@cvcNumber/CVCNumberTextField/CVCNumberTextField';
import Button from '@components/common/Button/Button';

import {
  PreviewCreditCardStyleContainer,
  TextFieldStyleContainer,
} from '@components/payments/CreditCardForm/container';

import { CARD_BRAND_MAP } from '@components/payments/@cardBrand/CardBrandDropdown/CardBrandDropdown.constant';
import { isCardBrandName } from '@components/payments/@cardBrand/CardBrandDropdown/CardBrandDropdown.util';

import useMovePage from '@hooks/useMovePage';
import useCreditCardForm from '@hooks/creditCard/useCreditCardForm';

import { isValidOwnerName } from '@domain/creditCard';

const CreditCardForm: React.FC = () => {
  const {
    formState: { cardBrand, cardNumbers, cardPassword, cvcNumber, ownerName, expiration },
    formErrors: { cvcError, expirationError, ownerNameError, cardNumberError, cardPasswordError },
    formInteractionState,
    formHandlers,
  } = useCreditCardForm();

  const handleMovePage = useMovePage('/card-register-complete', {
    cardPassword,
    cardBrand: isCardBrandName(cardBrand) ? CARD_BRAND_MAP[cardBrand] : '',
  });

  const previewCreditCardProps = {
    cvcNumber,
    cardBrand,
    cardNumbers,
    expiration,
    ownerName,
    isFocusedCVCNumber: formInteractionState.isFocusedCVCNumber,
    isCardBrandChange: cardBrand !== '',
  };

  const cardPasswordTextFieldProps = {
    cardPassword,
    cardPasswordError,
    onAddCardPassword: formHandlers.handleChangePassword,
  };

  const cvcNumberTextFieldProps = {
    cvcNumber: cvcNumber,
    cvcError: cvcError,
    onFocusCVCNumberField: formHandlers.handleChangeCVCNumberFocus,
    onAddCVCNumber: formHandlers.handleChangeCVCNumber,
  };

  const ownerNameTextFieldProps = { ownerName, ownerNameError, onAddOwnerName: formHandlers.handleOwnerNameChange };

  const expirationDateTextFieldProps = {
    month: expiration.month,
    year: expiration.year,
    onAddExpirationDate: formHandlers.handleExpirationChange,
    expirationError: expirationError,
  };

  const cardBrandTextFieldProps = {
    isOpen: formInteractionState.isDropdownOpen,
    currentCardBrand: cardBrand,
    onSelectCardBrand: formHandlers.handleSelectCardBrand,
    onToggleDropdown: formHandlers.handleToggle,
  };

  const cardNumberTextFieldProps = {
    isCardNumberError: formInteractionState.isCardNumberError,
    cardNumbers: cardNumbers,
    onAddCardNumber: formHandlers.handleCardNumberChange,
    cardNumberError: cardNumberError,
  };

  return (
    <>
      <PreviewCreditCardStyleContainer>
        <PreviewCreditCard {...previewCreditCardProps} />
      </PreviewCreditCardStyleContainer>
      <TextFieldStyleContainer>
        {formInteractionState.isCVCNumberCompleted && <CardPasswordTextField {...cardPasswordTextFieldProps} />}
        {isValidOwnerName(ownerName) && formInteractionState.isOwnerNameCompleted && (
          <CVCNumberTextField {...cvcNumberTextFieldProps} />
        )}
        {formInteractionState.isExpirationCompleted && <OwnerNameTextField {...ownerNameTextFieldProps} />}
        {!formInteractionState.isDropdownOpen && formInteractionState.isCardBrandCompleted && (
          <ExpirationDateTextField {...expirationDateTextFieldProps} />
        )}
        {formInteractionState.isCardNumberCompleted && <CardBrandTextField {...cardBrandTextFieldProps} />}
        <CardNumberTextField {...cardNumberTextFieldProps} />
      </TextFieldStyleContainer>
      {formInteractionState.isMountButton && (
        <Button isFloating onClick={() => handleMovePage()} size="large">
          확인
        </Button>
      )}
    </>
  );
};

export default CreditCardForm;
