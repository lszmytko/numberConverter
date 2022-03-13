import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import {showNumber} from './convertNumber'


test('Show 0 string properly', ()=>{
  expect(showNumber(0)).toBe("zero")
})

test('Show 7 as string properly', ()=>{
  expect(showNumber(7)).toBe("seven")
})

test('Show 42 as string properly', ()=>{
  expect(showNumber(42)).toBe("forty-two")
})

test('Show 1999 as string properly', ()=>{
  expect(showNumber(1999)).toBe("nineteen ninety-nine")
})

test('Show 2001 as string properly', ()=>{
  expect(showNumber(2001)).toBe("two thousand and one")
})

test('Show 17999 as string properly', ()=>{
  expect(showNumber(17999)).toBe("seventeen thousand nine hundred and ninety-nine")
})

test('Show 342251 as string properly', ()=>{
  expect(showNumber(342251)).toBe("three hundred and forty-two thousand two hundred and fifty-one")
})

test('Show 1300420 as string properly', ()=>{
  expect(showNumber(1300420)).toBe("one million three hundred thousand four hundred and twenty")
})

test('Show 1000000 as string properly', ()=>{
  expect(showNumber(1000000)).toBe("one million")
})

test('Show 1000243 as string properly', ()=>{
  expect(showNumber(1000243)).toBe("one million two hundred and forty-three")
})

test('Show 666342243 as string properly', ()=>{
  expect(showNumber(666342243)).toBe("six hundred and sixty-six million three hundred and forty-two thousand two hundred and forty-three")
})


