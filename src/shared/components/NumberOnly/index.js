import React, { useState, useEffect } from 'react';

const NumberOnly = React.forwardRef(({ onChange, name, initValue }, ref) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(initValue || '');
  }, [initValue]);

  return (
    <input
      ref={ref}
      className="form-control primary-input"
      placeholder="0.0"
      value={value}
      onChange={(ev) => {
        const enterValued = ev.currentTarget.value;
        if ((/^\d+(?:\.)?(?:\d+)?$/).test(enterValued) || enterValued === '') {
          setValue(enterValued);
          onChange(parseFloat(enterValued));
        }
      }}
      name={name}
    />
  );
});

export default NumberOnly;
