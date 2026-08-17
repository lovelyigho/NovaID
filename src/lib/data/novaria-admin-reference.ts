// Novaria Administrative Reference Data (Canonical Version 2.0)
// Official 30 States, 5 Geopolitical Zones, LGAs, and NCT Area Councils from Novaria_Administrative_Reference.xlsx

export interface GeopoliticalZone {
  code: string;
  name: string;
  description: string;
}

export interface NovariaState {
  code: string; // 2-letter state code e.g. KD, AR, MN
  name: string;
  capital: string;
  zoneCode: 'NORTH' | 'SOUTH' | 'EAST' | 'WEST' | 'CENTRAL' | 'NCT';
}

export interface NovariaLGA {
  code: string; // e.g. KD-01
  name: string;
  stateCode: string;
}

export const GEOPOLITICAL_ZONES: GeopoliticalZone[] = [
  { code: 'NORTH', name: 'North Zone', description: 'Kandova, Arinana, Bafri, Besta, Britav, Chece' },
  { code: 'SOUTH', name: 'South Zone', description: 'Manoca, Sorima, Denevuila, Fatain, Framioca, Glochi' },
  { code: 'EAST', name: 'East Zone', description: 'Tronto, Mivo, Guvdoari, Jomuthis, Kipre, Komheo' },
  { code: 'WEST', name: 'West Zone', description: 'Corintha, Ostravo, Kriki, Lehoinda, Mevro, Pokris' },
  { code: 'CENTRAL', name: 'Central Zone', description: 'Kolvira, Rebiata, Secuavi, Shotuv, Sipavu, Snaklim' },
  { code: 'NCT', name: 'Novaria Capital Territory', description: 'Federal capital district; seat of NICRA headquarters and Ministry of Interior' }
];

export const NOVARIA_STATES: NovariaState[] = [
  // NORTH ZONE (6 States)
  { code: 'KD', name: 'Kandova State', capital: 'Kandova', zoneCode: 'NORTH' },
  { code: 'AR', name: 'Arinana State', capital: 'Arinana', zoneCode: 'NORTH' },
  { code: 'BA', name: 'Bafri State', capital: 'Bafri', zoneCode: 'NORTH' },
  { code: 'BE', name: 'Besta State', capital: 'Besta', zoneCode: 'NORTH' },
  { code: 'BR', name: 'Britav State', capital: 'Britav', zoneCode: 'NORTH' },
  { code: 'CH', name: 'Chece State', capital: 'Chece', zoneCode: 'NORTH' },

  // SOUTH ZONE (6 States)
  { code: 'MN', name: 'Manoca State', capital: 'Manoca', zoneCode: 'SOUTH' },
  { code: 'SR', name: 'Sorima State', capital: 'Sorima', zoneCode: 'SOUTH' },
  { code: 'DE', name: 'Denevuila State', capital: 'Denevuila', zoneCode: 'SOUTH' },
  { code: 'FA', name: 'Fatain State', capital: 'Fatain', zoneCode: 'SOUTH' },
  { code: 'FR', name: 'Framioca State', capital: 'Framioca', zoneCode: 'SOUTH' },
  { code: 'GL', name: 'Glochi State', capital: 'Glochi', zoneCode: 'SOUTH' },

  // EAST ZONE (6 States)
  { code: 'TR', name: 'Tronto State', capital: 'Tronto', zoneCode: 'EAST' },
  { code: 'MV', name: 'Mivo State', capital: 'Mivo', zoneCode: 'EAST' },
  { code: 'GU', name: 'Guvdoari State', capital: 'Guvdoari', zoneCode: 'EAST' },
  { code: 'JO', name: 'Jomuthis State', capital: 'Jomuthis', zoneCode: 'EAST' },
  { code: 'KI', name: 'Kipre State', capital: 'Kipre', zoneCode: 'EAST' },
  { code: 'KO', name: 'Komheo State', capital: 'Komheo', zoneCode: 'EAST' },

  // WEST ZONE (6 States)
  { code: 'CR', name: 'Corintha State', capital: 'Corintha', zoneCode: 'WEST' },
  { code: 'OS', name: 'Ostravo State', capital: 'Ostravo', zoneCode: 'WEST' },
  { code: 'KR', name: 'Kriki State', capital: 'Kriki', zoneCode: 'WEST' },
  { code: 'LE', name: 'Lehoinda State', capital: 'Lehoinda', zoneCode: 'WEST' },
  { code: 'ME', name: 'Mevro State', capital: 'Mevro', zoneCode: 'WEST' },
  { code: 'PO', name: 'Pokris State', capital: 'Pokris', zoneCode: 'WEST' },

  // CENTRAL ZONE (6 States)
  { code: 'KV', name: 'Kolvira State', capital: 'Kolvira', zoneCode: 'CENTRAL' },
  { code: 'RE', name: 'Rebiata State', capital: 'Rebiata', zoneCode: 'CENTRAL' },
  { code: 'SE', name: 'Secuavi State', capital: 'Secuavi', zoneCode: 'CENTRAL' },
  { code: 'SH', name: 'Shotuv State', capital: 'Shotuv', zoneCode: 'CENTRAL' },
  { code: 'SI', name: 'Sipavu State', capital: 'Sipavu', zoneCode: 'CENTRAL' },
  { code: 'SN', name: 'Snaklim State', capital: 'Snaklim', zoneCode: 'CENTRAL' },

  // FEDERAL CAPITAL DISTRICT
  { code: 'NCT', name: 'Novaria Capital Territory', capital: 'Novaria City', zoneCode: 'NCT' }
];

export const NOVARIA_LGAS: NovariaLGA[] = [
  // Kandova State (KD)
  { code: 'KD-01', name: 'Kandova Central', stateCode: 'KD' },
  { code: 'KD-02', name: 'Varanta', stateCode: 'KD' },
  { code: 'KD-03', name: 'Tavren', stateCode: 'KD' },
  { code: 'KD-04', name: 'Birova', stateCode: 'KD' },
  { code: 'KD-05', name: 'Lekori', stateCode: 'KD' },
  { code: 'KD-06', name: 'Mirova', stateCode: 'KD' },
  { code: 'KD-07', name: 'Jorato', stateCode: 'KD' },

  // Arinana State (AR)
  { code: 'AR-01', name: 'Vol', stateCode: 'AR' },
  { code: 'AR-02', name: 'Shalo', stateCode: 'AR' },
  { code: 'AR-03', name: 'Madilla', stateCode: 'AR' },
  { code: 'AR-04', name: 'Dalmin', stateCode: 'AR' },
  { code: 'AR-05', name: 'Arinana South', stateCode: 'AR' },

  // Bafri State (BA)
  { code: 'BA-01', name: 'Bamfiesh', stateCode: 'BA' },
  { code: 'BA-02', name: 'Beklu', stateCode: 'BA' },
  { code: 'BA-03', name: 'Belucoari', stateCode: 'BA' },
  { code: 'BA-04', name: 'Beshi', stateCode: 'BA' },
  { code: 'BA-05', name: 'Bafri Central', stateCode: 'BA' },

  // Besta State (BE)
  { code: 'BE-01', name: 'Blere', stateCode: 'BE' },
  { code: 'BE-02', name: 'Bletdo', stateCode: 'BE' },
  { code: 'BE-03', name: 'Blusol', stateCode: 'BE' },
  { code: 'BE-04', name: 'Brethi', stateCode: 'BE' },
  { code: 'BE-05', name: 'Besta Main', stateCode: 'BE' },

  // Britav State (BR)
  { code: 'BR-01', name: 'Bruhi', stateCode: 'BR' },
  { code: 'BR-02', name: 'Brulcu', stateCode: 'BR' },
  { code: 'BR-03', name: 'Buglak', stateCode: 'BR' },
  { code: 'BR-04', name: 'Cekra', stateCode: 'BR' },
  { code: 'BR-05', name: 'Britav Town', stateCode: 'BR' },

  // Chece State (CH)
  { code: 'CH-01', name: 'Chedrilu', stateCode: 'CH' },
  { code: 'CH-02', name: 'Chotro', stateCode: 'CH' },
  { code: 'CH-03', name: 'Dajuis', stateCode: 'CH' },
  { code: 'CH-04', name: 'Dastav', stateCode: 'CH' },
  { code: 'CH-05', name: 'Chece Metro', stateCode: 'CH' },

  // Manoca State (MN)
  { code: 'MN-01', name: 'Franc', stateCode: 'MN' },
  { code: 'MN-02', name: 'Kessari', stateCode: 'MN' },
  { code: 'MN-03', name: 'Minka', stateCode: 'MN' },
  { code: 'MN-04', name: 'Avana', stateCode: 'MN' },
  { code: 'MN-05', name: 'Manoca Coast', stateCode: 'MN' },

  // Sorima State (SR)
  { code: 'SR-01', name: 'Solovivi', stateCode: 'SR' },
  { code: 'SR-02', name: 'Ishono', stateCode: 'SR' },
  { code: 'SR-03', name: 'Tashara', stateCode: 'SR' },
  { code: 'SR-04', name: 'Vornis', stateCode: 'SR' },
  { code: 'SR-05', name: 'Sorima Urban', stateCode: 'SR' },

  // Denevuila State (DE)
  { code: 'DE-01', name: 'Dihaeva', stateCode: 'DE' },
  { code: 'DE-02', name: 'Dikluvek', stateCode: 'DE' },
  { code: 'DE-03', name: 'Dohoira', stateCode: 'DE' },
  { code: 'DE-04', name: 'Droli', stateCode: 'DE' },
  { code: 'DE-05', name: 'Denevuila Central', stateCode: 'DE' },

  // Fatain State (FA)
  { code: 'FA-01', name: 'Febiolo', stateCode: 'FA' },
  { code: 'FA-02', name: 'Fehoira', stateCode: 'FA' },
  { code: 'FA-03', name: 'Femiesh', stateCode: 'FA' },
  { code: 'FA-04', name: 'Fradnuk', stateCode: 'FA' },
  { code: 'FA-05', name: 'Fatain Metro', stateCode: 'FA' },

  // Framioca State (FR)
  { code: 'FR-01', name: 'Frevikri', stateCode: 'FR' },
  { code: 'FR-02', name: 'Fuhuesh', stateCode: 'FR' },
  { code: 'FR-03', name: 'Gavru', stateCode: 'FR' },
  { code: 'FR-04', name: 'Glaskus', stateCode: 'FR' },
  { code: 'FR-05', name: 'Framioca Coast', stateCode: 'FR' },

  // Glochi State (GL)
  { code: 'GL-01', name: 'Glodu', stateCode: 'GL' },
  { code: 'GL-02', name: 'Glogli', stateCode: 'GL' },
  { code: 'GL-03', name: 'Gosjoika', stateCode: 'GL' },
  { code: 'GL-04', name: 'Gozuin', stateCode: 'GL' },
  { code: 'GL-05', name: 'Glochi Hub', stateCode: 'GL' },

  // Tronto State (TR)
  { code: 'TR-01', name: 'Ormari', stateCode: 'TR' },
  { code: 'TR-02', name: 'Kelmora', stateCode: 'TR' },
  { code: 'TR-03', name: 'Denkora', stateCode: 'TR' },
  { code: 'TR-04', name: 'Halvot', stateCode: 'TR' },
  { code: 'TR-05', name: 'Tronto Urban', stateCode: 'TR' },

  // Mivo State (MV)
  { code: 'MV-01', name: 'Petrona', stateCode: 'MV' },
  { code: 'MV-02', name: 'Bratona', stateCode: 'MV' },
  { code: 'MV-03', name: 'Rokova', stateCode: 'MV' },
  { code: 'MV-04', name: 'Ternis', stateCode: 'MV' },
  { code: 'MV-05', name: 'Mivo Central', stateCode: 'MV' },

  // Guvdoari State (GU)
  { code: 'GU-01', name: 'Guvnioca', stateCode: 'GU' },
  { code: 'GU-02', name: 'Hasnet', stateCode: 'GU' },
  { code: 'GU-03', name: 'Jasheinda', stateCode: 'GU' },
  { code: 'GU-04', name: 'Jedet', stateCode: 'GU' },
  { code: 'GU-05', name: 'Guvdoari Metro', stateCode: 'GU' },

  // Jomuthis State (JO)
  { code: 'JO-01', name: 'Kefev', stateCode: 'JO' },
  { code: 'JO-02', name: 'Kegieva', stateCode: 'JO' },
  { code: 'JO-03', name: 'Keziavi', stateCode: 'JO' },
  { code: 'JO-04', name: 'Kidrat', stateCode: 'JO' },
  { code: 'JO-05', name: 'Jomuthis East', stateCode: 'JO' },

  // Kipre State (KI)
  { code: 'KI-01', name: 'Kletra', stateCode: 'KI' },
  { code: 'KI-02', name: 'Klochu', stateCode: 'KI' },
  { code: 'KI-03', name: 'Klohi', stateCode: 'KI' },
  { code: 'KI-04', name: 'Klono', stateCode: 'KI' },
  { code: 'KI-05', name: 'Kipre Town', stateCode: 'KI' },

  // Komheo State (KO)
  { code: 'KO-01', name: 'Komzoa', stateCode: 'KO' },
  { code: 'KO-02', name: 'Kothina', stateCode: 'KO' },
  { code: 'KO-03', name: 'Kraser', stateCode: 'KO' },
  { code: 'KO-04', name: 'Krida', stateCode: 'KO' },
  { code: 'KO-05', name: 'Komheo Central', stateCode: 'KO' },

  // Corintha State (CR)
  { code: 'CR-01', name: 'Selkiv', stateCode: 'CR' },
  { code: 'CR-02', name: 'Dorvana', stateCode: 'CR' },
  { code: 'CR-03', name: 'Milante', stateCode: 'CR' },
  { code: 'CR-04', name: 'Vashira', stateCode: 'CR' },
  { code: 'CR-05', name: 'Corintha Metro', stateCode: 'CR' },

  // Ostravo State (OS)
  { code: 'OS-01', name: 'Stenira', stateCode: 'OS' },
  { code: 'OS-02', name: 'Bovarin', stateCode: 'OS' },
  { code: 'OS-03', name: 'Yelmira', stateCode: 'OS' },
  { code: 'OS-04', name: 'Fintara', stateCode: 'OS' },
  { code: 'OS-05', name: 'Ostravo Coastal', stateCode: 'OS' },

  // Kriki State (KR)
  { code: 'KR-01', name: 'Kroshu', stateCode: 'KR' },
  { code: 'KR-02', name: 'Kruglu', stateCode: 'KR' },
  { code: 'KR-03', name: 'Krumo', stateCode: 'KR' },
  { code: 'KR-04', name: 'Lafoinda', stateCode: 'KR' },
  { code: 'KR-05', name: 'Kriki Central', stateCode: 'KR' },

  // Lehoinda State (LE)
  { code: 'LE-01', name: 'Liljo', stateCode: 'LE' },
  { code: 'LE-02', name: 'Luhaceis', stateCode: 'LE' },
  { code: 'LE-03', name: 'Magli', stateCode: 'LE' },
  { code: 'LE-04', name: 'Mareavi', stateCode: 'LE' },
  { code: 'LE-05', name: 'Lehoinda Urban', stateCode: 'LE' },

  // Mevro State (ME)
  { code: 'ME-01', name: 'Misko', stateCode: 'ME' },
  { code: 'ME-02', name: 'Mizur', stateCode: 'ME' },
  { code: 'ME-03', name: 'Pencain', stateCode: 'ME' },
  { code: 'ME-04', name: 'Pojeari', stateCode: 'ME' },
  { code: 'ME-05', name: 'Mevro West', stateCode: 'ME' },

  // Pokris State (PO)
  { code: 'PO-01', name: 'Pralo', stateCode: 'PO' },
  { code: 'PO-02', name: 'Pulol', stateCode: 'PO' },
  { code: 'PO-03', name: 'Putaesh', stateCode: 'PO' },
  { code: 'PO-04', name: 'Racaila', stateCode: 'PO' },
  { code: 'PO-05', name: 'Pokris Main', stateCode: 'PO' },

  // Kolvira State (KV)
  { code: 'KV-01', name: 'Astrivo', stateCode: 'KV' },
  { code: 'KV-02', name: 'Kelvano', stateCode: 'KV' },
  { code: 'KV-03', name: 'Bralinda', stateCode: 'KV' },
  { code: 'KV-04', name: 'Torvesk', stateCode: 'KV' },
  { code: 'KV-05', name: 'Kolvira Central', stateCode: 'KV' },

  // Rebiata State (RE)
  { code: 'RE-01', name: 'Reglur', stateCode: 'RE' },
  { code: 'RE-02', name: 'Rekbeo', stateCode: 'RE' },
  { code: 'RE-03', name: 'Rivoin', stateCode: 'RE' },
  { code: 'RE-04', name: 'Rujoira', stateCode: 'RE' },
  { code: 'RE-05', name: 'Rebiata Hub', stateCode: 'RE' },

  // Secuavi State (SE)
  { code: 'SE-01', name: 'Setmifri', stateCode: 'SE' },
  { code: 'SE-02', name: 'Shamhu', stateCode: 'SE' },
  { code: 'SE-03', name: 'Shapucein', stateCode: 'SE' },
  { code: 'SE-04', name: 'Shokiesh', stateCode: 'SE' },
  { code: 'SE-05', name: 'Secuavi Metro', stateCode: 'SE' },

  // Shotuv State (SH)
  { code: 'SH-01', name: 'Shuvle', stateCode: 'SH' },
  { code: 'SH-02', name: 'Sidjeika', stateCode: 'SH' },
  { code: 'SH-03', name: 'Sijearis', stateCode: 'SH' },
  { code: 'SH-04', name: 'Sinvaila', stateCode: 'SH' },
  { code: 'SH-05', name: 'Shotuv Central', stateCode: 'SH' },

  // Sipavu State (SI)
  { code: 'SI-01', name: 'Sivmok', stateCode: 'SI' },
  { code: 'SI-02', name: 'Skoblu', stateCode: 'SI' },
  { code: 'SI-03', name: 'Skofrat', stateCode: 'SI' },
  { code: 'SI-04', name: 'Skostuk', stateCode: 'SI' },
  { code: 'SI-05', name: 'Sipavu Main', stateCode: 'SI' },

  // Snaklim State (SN)
  { code: 'SN-01', name: 'Snato', stateCode: 'SN' },
  { code: 'SN-02', name: 'Snubro', stateCode: 'SN' },
  { code: 'SN-03', name: 'Snugi', stateCode: 'SN' },
  { code: 'SN-04', name: 'Snute', stateCode: 'SN' },
  { code: 'SN-05', name: 'Snaklim Town', stateCode: 'SN' },

  // Novaria Capital Territory (NCT) Area Councils
  { code: 'NCT-01', name: 'North Area Council', stateCode: 'NCT' },
  { code: 'NCT-02', name: 'South Area Council', stateCode: 'NCT' },
  { code: 'NCT-03', name: 'East Area Council', stateCode: 'NCT' },
  { code: 'NCT-04', name: 'West Area Council', stateCode: 'NCT' },
  { code: 'NCT-05', name: 'Central Area Council', stateCode: 'NCT' }
];

export function getLGAsByState(stateCode: string): NovariaLGA[] {
  return NOVARIA_LGAS.filter(lga => lga.stateCode === stateCode);
}

export function getStateByCode(stateCode: string): NovariaState | undefined {
  return NOVARIA_STATES.find(s => s.code === stateCode);
}

export function getZoneName(zoneCode: string): string {
  const zone = GEOPOLITICAL_ZONES.find(z => z.code === zoneCode);
  return zone ? zone.name : zoneCode;
}
