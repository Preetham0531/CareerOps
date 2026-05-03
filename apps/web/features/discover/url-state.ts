'use client';

import {
  parseAsInteger,
  parseAsArrayOf,
  parseAsBoolean,
  parseAsString,
  parseAsStringEnum,
  useQueryStates,
} from 'nuqs';

/**
 * URL-bound discovery filters via nuqs. Filters serialize to query params,
 * so a filter set is shareable / bookmarkable.
 */

export const filterParsers = {
  query: parseAsString.withDefault(''),
  roles: parseAsArrayOf(parseAsString).withDefault([]),
  cities: parseAsArrayOf(parseAsString).withDefault([]),
  remoteOnly: parseAsBoolean.withDefault(false),
  lpaMin: parseAsInteger.withDefault(5),
  lpaMax: parseAsInteger.withDefault(80),
  expMin: parseAsInteger.withDefault(0),
  expMax: parseAsInteger.withDefault(15),
  workMode: parseAsArrayOf(parseAsStringEnum(['remote', 'hybrid', 'onsite'])).withDefault([]),
  sources: parseAsArrayOf(parseAsString).withDefault([]),
  hideGhostAbove: parseAsInteger.withDefault(100), // 100 = no hide
  hideBondBench: parseAsBoolean.withDefault(false),
  onlyWithReferral: parseAsBoolean.withDefault(false),
  sort: parseAsStringEnum(['match', 'newest', 'lpa-desc', 'response-rate']).withDefault('match'),
};

export function useDiscoverUrlState() {
  return useQueryStates(filterParsers, { history: 'replace', shallow: false });
}

export function urlStateToApiInput(s: ReturnType<typeof useDiscoverUrlState>[0]) {
  return {
    query: s.query || undefined,
    roles: s.roles,
    cities: s.cities,
    remoteOnly: s.remoteOnly,
    lpa: [s.lpaMin, s.lpaMax] as [number, number],
    experience: [s.expMin, s.expMax] as [number, number],
    workMode: s.workMode,
    sources: s.sources,
    hideGhostAbove: s.hideGhostAbove / 100, // 0–1 in API
    hideBondBench: s.hideBondBench,
    onlyWithReferral: s.onlyWithReferral,
    sort: s.sort,
    cursor: null,
  };
}
