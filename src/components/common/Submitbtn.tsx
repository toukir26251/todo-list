import React, { useState } from 'react'
import { Button, Spinner } from 'react-bootstrap'
import { selectSubmitBtnLoading } from '../../redux-store/selectors/loadingSelecteors'
import { setSubmitBtnLoading } from '../../redux-store/slices/loadingSlice'
import { useAppDispatch, useAppSelector } from '../../redux-store/hooks'

interface Props{
  name: string,
  variant: string
}

const Submitbtn = ({name, variant}: Props) => {
  
  const dispatch = useAppDispatch()
  const isSubmitBtnLoading = useAppSelector(selectSubmitBtnLoading)

  const handleClick = async (e: React.FormEvent<HTMLButtonElement>) => {
    dispatch(setSubmitBtnLoading(true));
    try {
      const form = e.currentTarget.closest('form');

      if (!form) return;

      const formSubmitEvent = new Event('submit', { bubbles: true, cancelable: true });
      form.dispatchEvent(formSubmitEvent);
    } catch {
      dispatch(setSubmitBtnLoading(false));
    }
  };

  return (
    <Button 
      className="mb-3" 
      variant={variant} 
      type='submit'
      disabled={isSubmitBtnLoading }
      onClick={handleClick}
    >
      {isSubmitBtnLoading ? (
        <>
          <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
          <span className="ms-2">{name}</span>
        </>
      ) : (
        name
      )}
    </Button>
  )
}

export default Submitbtn
