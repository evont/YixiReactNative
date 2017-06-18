import 'react-native';
import React from 'react';
import Home from '../app/pages/Home';
import Lecture from '../app/pages/Lecture';
import Lecturer from '../app/pages/Lecturer';
import Record from '../app/pages/Record';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';


test('renders correctly', () => {
  const tree = renderer.create(
    <Home />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly', () => {
  const tree = renderer.create(
    <Lecture />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly', () => {
  const tree = renderer.create(
    <Lecturer />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders correctly', () => {
  const tree = renderer.create(
    <Record />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
