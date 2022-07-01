import {
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
    FormHelperText,
} from '@mui/material';
import React from 'react';
import { VisibilityOff, Visibility } from '@mui/icons-material';

const PasswordField = ({
    label,
    id,
    isSubmitting,
    showPassword,
    value,
    onChange,
    handleClickShowPassword,
    formikToched,
    formikErrors,
}) => {
    return (
        <FormControl fullWidth variant="outlined" sx={{ marginTop: '10px' }}>
            <InputLabel htmlFor="outlined-adornment-password">
                {label}
            </InputLabel>
            <OutlinedInput
                disabled={isSubmitting}
                id={id}
                type={showPassword ? 'text' : 'password'}
                value={value}
                onChange={onChange}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                        >
                            {!showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
                label={label}
                error={formikToched && Boolean(formikErrors)}
            />
            <FormHelperText id="my-helper-text" error>
                {formikToched && formikErrors}
            </FormHelperText>
        </FormControl>
    );
};

export default PasswordField;
