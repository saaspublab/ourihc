import React from 'react';
import { Link } from 'react-router-dom';
import useStickyState from '../components/UseStickyState';
import styles from './nope.module.sass';

const assignments = [
  {
    assignedGroup: 1,
    emailAddress: 'mdiallo@saintanselms.org',
  },
  {
    assignedGroup: 1,
    emailAddress: 'hhubbard@saintanselms.org',
  },
  {
    assignedGroup: 1,
    emailAddress: 'dhair@saintanselms.org',
  },
  {
    assignedGroup: 1,
    emailAddress: 'zcai@saintanselms.org',
  },
  {
    assignedGroup: 1,
    emailAddress: 'fsimmons@saintanselms.org',
  },
  {
    assignedGroup: 1,
    emailAddress: 'ghubner@saintanselms.org',
  },
  {
    assignedGroup: 1,
    emailAddress: 'wchen@saintanselms.org',
  },
  {
    assignedGroup: 1,
    emailAddress: 'ebeavers@saintanselms.org',
  },
  {
    assignedGroup: 1,
    emailAddress: 'zhipple@saintanselms.org',
  },
  {
    assignedGroup: 1,
    emailAddress: 'pchu@saintanselms.org',
  },
  {
    assignedGroup: 1,
    emailAddress: 'thargan@saintanselms.org',
  },
  {
    assignedGroup: 1,
    emailAddress: 'mwright@saintanselms.org',
  },
  {
    assignedGroup: 1,
    emailAddress: 'mndjikinya@saintanselms.org',
  },
  {
    assignedGroup: 1,
    emailAddress: 'joverdeck@saintanselms.org',
  },
  {
    assignedGroup: 1,
    emailAddress: 'mpandula@saintanselms.org',
  },
  {
    assignedGroup: 1,
    emailAddress: 'eonyewu@saintanselms.org',
  },
  {
    assignedGroup: 1,
    emailAddress: 'cwelch@saintanselms.org',
  },
  {
    assignedGroup: 1,
    emailAddress: 'eamedo@saintanselms.org',
  },
  {
    assignedGroup: 1,
    emailAddress: 'clow@saintanselms.org',
  },
  {
    assignedGroup: 1,
    emailAddress: 'jonyewu@saintanselms.org',
  },
  {
    assignedGroup: 1,
    emailAddress: 'emontague@saintanselms.org',
  },
  {
    assignedGroup: 1,
    emailAddress: 'nmekonnen@saintanselms.org',
  },
  {
    assignedGroup: 1,
    emailAddress: 'rsinha@saintanselms.org',
  },
  {
    assignedGroup: 1,
    emailAddress: 'rwilliams@saintanselms.org',
  },
  {
    assignedGroup: 1,
    emailAddress: 'wcurwen@saintanselms.org',
  },
  {
    assignedGroup: 1,
    emailAddress: 'mkroloff@saintanselms.org',
  },
  {
    assignedGroup: 1,
    emailAddress: 'zmao@saintanselms.org',
  },
  {
    assignedGroup: 1,
    emailAddress: 'nweeks@saintanselms.org',
  },
  {
    assignedGroup: 1,
    emailAddress: 'jlang@saintanselms.org',
  },
  {
    assignedGroup: 1,
    emailAddress: 'nnorris@saintanselms.org',
  },
  {
    assignedGroup: 1,
    emailAddress: 'anamba@saintanselms.org',
  },
  {
    assignedGroup: 1,
    emailAddress: 'jstubbs@saintanselms.org',
  },
  {
    assignedGroup: 1,
    emailAddress: 'kmchugh@saintanselms.org',
  },
  {
    assignedGroup: 1,
    emailAddress: 'lkilrain@saintanselms.org',
  },
  {
    assignedGroup: 1,
    emailAddress: 'japaci@saintanselms.org',
  },
  {
    assignedGroup: 1,
    emailAddress: 'hshepard@saintanselms.org',
  },
  {
    assignedGroup: 1,
    emailAddress: 'srudolph@saintanselms.org',
  },
  {
    assignedGroup: 1,
    emailAddress: 'pschaubach@saintanselms.org',
  },
  {
    assignedGroup: 1,
    emailAddress: 'gkaufman@saintanselms.org',
  },
  {
    assignedGroup: 1,
    emailAddress: 'woehrle@saintanselms.org',
  },
  {
    assignedGroup: 1,
    emailAddress: 'aemmanuel@saintanselms.org',
  },
  {
    assignedGroup: 1,
    emailAddress: 'jcrowell@saintanselms.org',
  },
  {
    assignedGroup: 1,
    emailAddress: 'dchu@saintanselms.org',
  },
  {
    assignedGroup: 1,
    emailAddress: 'dchinkhota@saintanselms.org',
  },
  {
    assignedGroup: 1,
    emailAddress: 'amcrae@saintanselms.org',
  },
  {
    assignedGroup: 1,
    emailAddress: 'amccuaig@saintanselms.org',
  },
  {
    assignedGroup: 1,
    emailAddress: 'acuddihy@saintanselms.org',
  },
  {
    assignedGroup: 1,
    emailAddress: 'tabell@saintanselms.org',
  },
  {
    assignedGroup: 1,
    emailAddress: 'gbonilla@saintanselms.org',
  },
  {
    assignedGroup: 1,
    emailAddress: 'ptonha@saintanselms.org',
  },
  {
    assignedGroup: 1,
    emailAddress: 'lfuqua@saintanselms.org',
  },
  {
    assignedGroup: 1,
    emailAddress: 'mlloyd@saintanselms.org',
  },
  {
    assignedGroup: 1,
    emailAddress: 'cgould@saintanselms.org',
  },
  {
    assignedGroup: 1,
    emailAddress: 'mfungeripley@saintanselms.org',
  },
  {
    assignedGroup: 1,
    emailAddress: 'aisaac@saintanselms.org',
  },
  {
    assignedGroup: 1,
    emailAddress: 'jmurphy@saintanselms.org',
  },
  {
    assignedGroup: 1,
    emailAddress: 'wshea@saintanselms.org',
  },
  {
    assignedGroup: 1,
    emailAddress: 'zxu@saintanselms.org',
  },
  {
    assignedGroup: 2,
    emailAddress: 'mdunn@saintanselms.org',
  },
  {
    assignedGroup: 2,
    emailAddress: 'iiweanoge@saintanselms.org',
  },
  {
    assignedGroup: 2,
    emailAddress: 'miweanoge@saintanselms.org',
  },
  {
    assignedGroup: 2,
    emailAddress: 'agotora@saintanselms.org',
  },
  {
    assignedGroup: 2,
    emailAddress: 'frdaleyyoung@saintanselms.org',
  },
  {
    assignedGroup: 2,
    emailAddress: 'ilares@saintanselms.org',
  },
  {
    assignedGroup: 2,
    emailAddress: 'mjadotte@saintanselms.org',
  },
  {
    assignedGroup: 2,
    emailAddress: 'hbonner@saintanselms.org',
  },
  {
    assignedGroup: 2,
    emailAddress: 'jmoncher@saintanselms.org',
  },
  {
    assignedGroup: 2,
    emailAddress: 'cfreeman@saintanselms.org',
  },
  {
    assignedGroup: 2,
    emailAddress: 'sheaney@saintanselms.org',
  },
  {
    assignedGroup: 2,
    emailAddress: 'zachikeh@saintanselms.org',
  },
  {
    assignedGroup: 2,
    emailAddress: 'avoglmayr@saintanselms.org',
  },
  {
    assignedGroup: 2,
    emailAddress: 'zspencer@saintanselms.org',
  },
  {
    assignedGroup: 2,
    emailAddress: 'eruizdegaray@saintanselms.org',
  },
  {
    assignedGroup: 2,
    emailAddress: 'brenz@saintanselms.org',
  },
  {
    assignedGroup: 2,
    emailAddress: 'jcameron@saintanselms.org',
  },
  {
    assignedGroup: 2,
    emailAddress: 'wcarbonneau@saintanselms.org',
  },
  {
    assignedGroup: 2,
    emailAddress: 'dtedeschi@saintanselms.org',
  },
  {
    assignedGroup: 2,
    emailAddress: 'cpaxton@saintanselms.org',
  },
  {
    assignedGroup: 2,
    emailAddress: 'iokaye@saintanselms.org',
  },
  {
    assignedGroup: 2,
    emailAddress: 'jmuise@saintanselms.org',
  },
  {
    assignedGroup: 2,
    emailAddress: 'efhughes@saintanselms.org',
  },
  {
    assignedGroup: 2,
    emailAddress: 'fbentley@saintanselms.org',
  },
  {
    assignedGroup: 2,
    emailAddress: 'jwatkins@saintanselms.org',
  },
  {
    assignedGroup: 2,
    emailAddress: 'lgidley@saintanselms.org',
  },
  {
    assignedGroup: 2,
    emailAddress: 'wbailey@saintanselms.org',
  },
  {
    assignedGroup: 2,
    emailAddress: 'jrankin@saintanselms.org',
  },
  {
    assignedGroup: 2,
    emailAddress: 'jwakefield@saintanselms.org',
  },
  {
    assignedGroup: 2,
    emailAddress: 'nthomas@saintanselms.org',
  },
  {
    assignedGroup: 2,
    emailAddress: 'junderwood@saintanselms.org',
  },
  {
    assignedGroup: 2,
    emailAddress: 'awarfield@saintanselms.org',
  },
  {
    assignedGroup: 2,
    emailAddress: 'mnamba@saintanselms.org',
  },
  {
    assignedGroup: 2,
    emailAddress: 'fpowell@saintanselms.org',
  },
  {
    assignedGroup: 2,
    emailAddress: 'jpainter@saintanselms.org',
  },
  {
    assignedGroup: 2,
    emailAddress: 'jsmoker@saintanselms.org',
  },
  {
    assignedGroup: 2,
    emailAddress: 'dslater@saintanselms.org',
  },
  {
    assignedGroup: 2,
    emailAddress: 'bzheng@saintanselms.org',
  },
  {
    assignedGroup: 2,
    emailAddress: 'dnalezyty@saintanselms.org',
  },
  {
    assignedGroup: 2,
    emailAddress: 'cperry@saintanselms.org',
  },
  {
    assignedGroup: 2,
    emailAddress: 'hfelgenhauer@saintanselms.org',
  },
  {
    assignedGroup: 2,
    emailAddress: 'hfilmer@saintanselms.org',
  },
  {
    assignedGroup: 2,
    emailAddress: 'lcruz@saintanselms.org',
  },
  {
    assignedGroup: 2,
    emailAddress: 'wmccuaig@saintanselms.org',
  },
  {
    assignedGroup: 2,
    emailAddress: 'epuro@saintanselms.org',
  },
  {
    assignedGroup: 2,
    emailAddress: 'nonyewu@saintanselms.org',
  },
  {
    assignedGroup: 2,
    emailAddress: 'rgreenberg@saintanselms.org',
  },
  {
    assignedGroup: 2,
    emailAddress: 'nkidanemariam@saintanselms.org',
  },
  {
    assignedGroup: 2,
    emailAddress: 'egoff@saintanselms.org',
  },
  {
    assignedGroup: 2,
    emailAddress: 'rwelch@saintanselms.org',
  },
  {
    assignedGroup: 2,
    emailAddress: 'dpeace@saintanselms.org',
  },
  {
    assignedGroup: 2,
    emailAddress: 'awatkins@saintanselms.org',
  },
  {
    assignedGroup: 2,
    emailAddress: 'whicks@saintanselms.org',
  },
  {
    assignedGroup: 2,
    emailAddress: 'amccullers@saintanselms.org',
  },
  {
    assignedGroup: 2,
    emailAddress: 'bmcelroy@saintanselms.org',
  },
  {
    assignedGroup: 2,
    emailAddress: 'aberry@saintanselms.org',
  },
  {
    assignedGroup: 2,
    emailAddress: 'bschwartz@saintanselms.org',
  },
  {
    assignedGroup: 2,
    emailAddress: 'mkuhn@saintanselms.org',
  },
  {
    assignedGroup: 3,
    emailAddress: 'hhoffman@saintanselms.org',
  },
  {
    assignedGroup: 3,
    emailAddress: 'zmalphus@saintanselms.org',
  },
  {
    assignedGroup: 3,
    emailAddress: 'cmchugh@saintanselms.org',
  },
  {
    assignedGroup: 3,
    emailAddress: 'hhowson@saintanselms.org',
  },
  {
    assignedGroup: 3,
    emailAddress: 'gzhu@saintanselms.org',
  },
  {
    assignedGroup: 3,
    emailAddress: 'jthayer@saintanselms.org',
  },
  {
    assignedGroup: 3,
    emailAddress: 'treimer@saintanselms.org',
  },
  {
    assignedGroup: 3,
    emailAddress: 'claski@saintanselms.org',
  },
  {
    assignedGroup: 3,
    emailAddress: 'dnadarajah@saintanselms.org',
  },
  {
    assignedGroup: 3,
    emailAddress: 'mhuitema@saintanselms.org',
  },
  {
    assignedGroup: 3,
    emailAddress: 'pkirby@saintanselms.org',
  },
  {
    assignedGroup: 3,
    emailAddress: 'jbarnidge@saintanselms.org',
  },
  {
    assignedGroup: 3,
    emailAddress: 'mbreton@saintanselms.org',
  },
  {
    assignedGroup: 3,
    emailAddress: 'pazorc@saintanselms.org',
  },
  {
    assignedGroup: 3,
    emailAddress: 'jmontague@saintanselms.org',
  },
  {
    assignedGroup: 3,
    emailAddress: 'csevcik@saintanselms.org',
  },
  {
    assignedGroup: 3,
    emailAddress: 'jturner@saintanselms.org',
  },
  {
    assignedGroup: 3,
    emailAddress: 'bharman@saintanselms.org',
  },
  {
    assignedGroup: 3,
    emailAddress: 'dlandry@saintanselms.org',
  },
  {
    assignedGroup: 3,
    emailAddress: 'bmartin@saintanselms.org',
  },
  {
    assignedGroup: 3,
    emailAddress: 'gburchard@saintanselms.org',
  },
  {
    assignedGroup: 3,
    emailAddress: 'tgould@saintanselms.org',
  },
  {
    assignedGroup: 3,
    emailAddress: 'marobinson@saintanselms.org',
  },
  {
    assignedGroup: 3,
    emailAddress: 'nwidman@saintanselms.org',
  },
  {
    assignedGroup: 3,
    emailAddress: 'cjacobs@saintanselms.org',
  },
  {
    assignedGroup: 3,
    emailAddress: 'wlloyd@saintanselms.org',
  },
  {
    assignedGroup: 3,
    emailAddress: 'mrobinson@saintanselms.org',
  },
  {
    assignedGroup: 3,
    emailAddress: 'ndemssie@saintanselms.org',
  },
  {
    assignedGroup: 3,
    emailAddress: 'matikem@saintanselms.org',
  },
  {
    assignedGroup: 3,
    emailAddress: 'tlamond@saintanselms.org',
  },
  {
    assignedGroup: 3,
    emailAddress: 'tbraden@saintanselms.org',
  },
  {
    assignedGroup: 3,
    emailAddress: 'eamatie@saintanselms.org',
  },
  {
    assignedGroup: 3,
    emailAddress: 'bparker@saintanselms.org',
  },
  {
    assignedGroup: 3,
    emailAddress: 'jfeira@saintanselms.org',
  },
  {
    assignedGroup: 3,
    emailAddress: 'amelese@saintanselms.org',
  },
  {
    assignedGroup: 3,
    emailAddress: 'alkim@saintanselms.org',
  },
  {
    assignedGroup: 3,
    emailAddress: 'bcostantino@saintanselms.org',
  },
  {
    assignedGroup: 3,
    emailAddress: 'tburke@saintanselms.org',
  },
  {
    assignedGroup: 3,
    emailAddress: 'nbrady@saintanselms.org',
  },
  {
    assignedGroup: 3,
    emailAddress: 'jroberti@saintanselms.org',
  },
  {
    assignedGroup: 3,
    emailAddress: 'dmckenzie@saintanselms.org',
  },
  {
    assignedGroup: 3,
    emailAddress: 'ofitzpatrick@saintanselms.org',
  },
  {
    assignedGroup: 3,
    emailAddress: 'ndecarlo@saintanselms.org',
  },
  {
    assignedGroup: 3,
    emailAddress: 'namedo@saintanselms.org',
  },
  {
    assignedGroup: 3,
    emailAddress: 'sgreiner@saintanselms.org',
  },
  {
    assignedGroup: 3,
    emailAddress: 'hchen@saintanselms.org',
  },
  {
    assignedGroup: 3,
    emailAddress: 'awetterhan@saintanselms.org',
  },
  {
    assignedGroup: 3,
    emailAddress: 'dvolcic@saintanselms.org',
  },
  {
    assignedGroup: 3,
    emailAddress: 'dsipes@saintanselms.org',
  },
  {
    assignedGroup: 3,
    emailAddress: 'eonyewu@saintanselms.org',
  },
  {
    assignedGroup: 3,
    emailAddress: 'agottlieb@saintanselms.org',
  },
  {
    assignedGroup: 3,
    emailAddress: 'jchapman-givens@saintanselms.org',
  },
  {
    assignedGroup: 3,
    emailAddress: 'ehughes@saintanselms.org',
  },
  {
    assignedGroup: 3,
    emailAddress: 'kunangst@saintanselms.org',
  },
  {
    assignedGroup: 3,
    emailAddress: 'bpeace@saintanselms.org',
  },
  {
    assignedGroup: 3,
    emailAddress: 'mwashington@saintanselms.org',
  },
  {
    assignedGroup: 3,
    emailAddress: 'bzelalem@saintanselms.org',
  },
  {
    assignedGroup: 4,
    emailAddress: 'mkretschmer@saintanselms.org',
  },
  {
    assignedGroup: 4,
    emailAddress: 'amoss@saintanselms.org',
  },
  {
    assignedGroup: 4,
    emailAddress: 'cpaletta@saintanselms.org',
  },
  {
    assignedGroup: 4,
    emailAddress: 'akim@saintanselms.org',
  },
  {
    assignedGroup: 4,
    emailAddress: 'khornyak@saintanselms.org',
  },
  {
    assignedGroup: 4,
    emailAddress: 'emontesi@saintanselms.org',
  },
  {
    assignedGroup: 4,
    emailAddress: 'jmckean@saintanselms.org',
  },
  {
    assignedGroup: 4,
    emailAddress: 'lcostantino@saintanselms.org',
  },
  {
    assignedGroup: 4,
    emailAddress: 'mcamarapaslar@saintanselms.org',
  },
  {
    assignedGroup: 4,
    emailAddress: 'nbrundage@saintanselms.org',
  },
  {
    assignedGroup: 4,
    emailAddress: 'nwachira@saintanselms.org',
  },
  {
    assignedGroup: 4,
    emailAddress: 'vnadarajah@saintanselms.org',
  },
  {
    assignedGroup: 4,
    emailAddress: 'ajarboe@saintanselms.org',
  },
  {
    assignedGroup: 4,
    emailAddress: 'slott@saintanselms.org',
  },
  {
    assignedGroup: 4,
    emailAddress: 'tludwa@saintanselms.org',
  },
  {
    assignedGroup: 4,
    emailAddress: 'plibanati@saintanselms.org',
  },
  {
    assignedGroup: 4,
    emailAddress: 'lcrawford@saintanselms.org',
  },
  {
    assignedGroup: 4,
    emailAddress: 'swolf@saintanselms.org',
  },
  {
    assignedGroup: 4,
    emailAddress: 'dwelch@saintanselms.org',
  },
  {
    assignedGroup: 4,
    emailAddress: 'stischler@saintanselms.org',
  },
  {
    assignedGroup: 4,
    emailAddress: 'nsamuel@saintanselms.org',
  },
  {
    assignedGroup: 4,
    emailAddress: 'acibor@saintanselms.org',
  },
  {
    assignedGroup: 4,
    emailAddress: 'kaiyar@saintanselms.org',
  },
  {
    assignedGroup: 4,
    emailAddress: 'mmurphy@saintanselms.org',
  },
  {
    assignedGroup: 4,
    emailAddress: 'bkarpinski@saintanselms.org',
  },
  {
    assignedGroup: 4,
    emailAddress: 'lkalhorn@saintanselms.org',
  },
  {
    assignedGroup: 4,
    emailAddress: 'bwilliams@saintanselms.org',
  },
  {
    assignedGroup: 4,
    emailAddress: 'ltraver@saintanselms.org',
  },
  {
    assignedGroup: 4,
    emailAddress: 'zezebuiro@saintanselms.org',
  },
  {
    assignedGroup: 4,
    emailAddress: 'ebradshaw@saintanselms.org',
  },
  {
    assignedGroup: 4,
    emailAddress: 'nbenyam@saintanselms.org',
  },
  {
    assignedGroup: 4,
    emailAddress: 'pritacco@saintanselms.org',
  },
  {
    assignedGroup: 4,
    emailAddress: 'hholley@saintanselms.org',
  },
  {
    assignedGroup: 4,
    emailAddress: 'kcai@saintanselms.org',
  },
  {
    assignedGroup: 4,
    emailAddress: 'erossignol@saintanselms.org',
  },
  {
    assignedGroup: 4,
    emailAddress: 'nrydstrom@saintanselms.org',
  },
  {
    assignedGroup: 4,
    emailAddress: 'ohuitema@saintanselms.org',
  },
  {
    assignedGroup: 4,
    emailAddress: 'nlockerman@saintanselms.org',
  },
  {
    assignedGroup: 4,
    emailAddress: 'lcastro@saintanselms.org',
  },
  {
    assignedGroup: 4,
    emailAddress: 'jburke@saintanselms.org',
  },
  {
    assignedGroup: 4,
    emailAddress: 'cvongoins@saintanselms.org',
  },
  {
    assignedGroup: 4,
    emailAddress: 'nniski@saintanselms.org',
  },
  {
    assignedGroup: 4,
    emailAddress: 'osilver@saintanselms.org',
  },
  {
    assignedGroup: 4,
    emailAddress: 'lzaidi@saintanselms.org',
  },
  {
    assignedGroup: 4,
    emailAddress: 'cklapthor@saintanselms.org',
  },
  {
    assignedGroup: 4,
    emailAddress: 'mlynch@saintanselms.org',
  },
  {
    assignedGroup: 4,
    emailAddress: 'pmedina@saintanselms.org',
  },
  {
    assignedGroup: 4,
    emailAddress: 'kdefosse@saintanselms.org',
  },
  {
    assignedGroup: 4,
    emailAddress: 'jwilliams@saintanselms.org',
  },
  {
    assignedGroup: 4,
    emailAddress: 'afoster@saintanselms.org',
  },
  {
    assignedGroup: 4,
    emailAddress: 'mjancachagua@saintanselms.org',
  },
  {
    assignedGroup: 4,
    emailAddress: 'jzegal@saintanselms.org',
  },
  {
    assignedGroup: 4,
    emailAddress: 'wheiser@saintanselms.org',
  },
  {
    assignedGroup: 4,
    emailAddress: 'wemuoio@saintanselms.org',
  },
  {
    assignedGroup: 4,
    emailAddress: 'ofoley@saintanselms.org',
  },
];

const links = [
  'https://saintanselms.zoom.us/j/97646281901?pwd=cW01d05LTmV5NmlCd1BvUTIvZ2hoUT09',
  'https://saintanselms.zoom.us/j/98405501386?pwd=RHhKTkpTdFY5SEJoOWF1d0gyYk1kUT09',
  'https://saintanselms.zoom.us/j/97672684220?pwd=VmEvTmJ1ODU0anVCRWgzQUVRWFladz09',
  'https://saintanselms.zoom.us/j/92911504282?pwd=WlMrb1hXMnFPQVFjV3hmUU4wdEZZQT09',
  'https://saintanselms.zoom.us/j/95266370870?pwd=Tm9MdDhZUW1jRWZrMU9haDBWTlpSdz09',
];

const currentHour = new Date().getHours();
let greetingMessage;

if (currentHour >= 4 && currentHour < 12) {
  // after 4:00AM and before 12:00PM
  greetingMessage = 'Good morning';
} else if (currentHour >= 12 && currentHour <= 17) {
  // after 12:00PM and before 6:00pm
  greetingMessage = 'Good afternoon';
} else if (currentHour > 17 || currentHour < 4) {
  // after 5:59pm or before 4:00AM (to accommodate night owls)
  greetingMessage = 'Good evening';
} else {
  // if for some reason the calculation didn't work
  greetingMessage = 'Welcome';
}

export const useInput = (initialValue) => {
  const [value, setValue] = useStickyState(initialValue, 'email');

  return {
    value,
    setValue,
    bind: {
      value,
      onChange: (event) => {
        setValue(event.target.value);
      },
    },
  };
};

function Join() {
  const { value: email, bind: bindEmail } = useInput('@saintanselms.org');

  let assignedGroup;

  if (
    email.length > 1 &&
    assignments.filter((e) => e.emailAddress === email).length > 0
  ) {
    assignedGroup = assignments.find((obj) => obj.emailAddress === email)
      .assignedGroup;
  }

  return (
    <div className={[styles.wrapper, 'page--maroon'].join(' ')}>
      <h4>House Day 2020:</h4>
      <h1>Important Information</h1>
      <p>
        <b>Wow, it's already that time of year! Welcome to House Day!</b> This
        page will bring you up-to-speed with everything you need to know before
        the festivities kick off.
      </p>
      <p>
        At the bottom of this page, you must enter your school email address.
      </p>

      <section className="content--block bordered">
        <h3 className="heading">Schedule</h3>
        <p>
          House Day will <b>start promptly at 9:00 AM</b> Friday morning. Please
          start connecting to Zoom around 8:45 AM to ensure you don't miss
          anything.
        </p>

        <br />

        <ul>
          <li>
            <b>8:45 AM</b>: Start connecting to Zoom
          </li>
          <li>
            <b>9:00 AM</b>: Prompt start
          </li>
          <li>
            <b>12:15 PM</b>: 10-minute snack break
          </li>
          <li>
            <b>1:30 PM</b>: Point tally and announcement of the winner from
            Headmaster Dr. Power
          </li>
        </ul>
      </section>

      <section className="content--block bordered">
        <h3 className="heading">What do I need?</h3>
        <p>If you have a camera, make sure to turn it on!</p>
        <p>
          <b>Returning students:</b> make sure to wear your house shirt!
        </p>
        <p>
          <b>New students:</b> you will be drafted into your house live during
          the event. Wear your PE shirt, if you have it.
        </p>
      </section>

      {(!email ||
        !assignments.filter((e) => e.emailAddress === email).length > 0) && (
        <section className="content--block bordered">
          <h3 className="heading">Your School Email Address + Zoom Links</h3>

          <p>
            <b>IMPORTANT:</b> once you type your email address, you will not be
            able to edit it. Entering an email address that is not your own may
            disqualify you from all activities.
          </p>

          <br />

          <form style={{ margin: 0 }}>
            <label htmlFor="email">
              School Email Address
              <input
                type="email"
                name="email"
                placeholder="lserif@saintanselms.org"
                required
                {...bindEmail}
              />
            </label>
          </form>

          {email.length >= '@saintanselms.org'.length + 3 && (
            <p style={{ marginTop: 0 }}>
              <b>
                Hmmm... We weren't able to find a student with that email
                address.
              </b>{' '}
              Check your spelling, and if the error persists, please message us
              as soon as possible on <Link to="/discord">Discord</Link>,{' '}
              <a
                href="//instagram.com/inter.house.council"
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                Instagram
              </a>
              , or by{' '}
              <a
                href="mailto:ihc@saintanselms.org"
                target="_blank"
                rel="noopener noreferrer nofoollow"
              >
                email (ihc@saintanselms.org)
              </a>
              .
            </p>
          )}
        </section>
      )}

      {email.length > 1 &&
        assignments.filter((e) => e.emailAddress === email).length > 0 && (
          <>
            <section className="content--block bordered">
              <h3 className="heading">{`${greetingMessage}, ${email}!`}</h3>

              <p>Throughout House Day, there are 2 Zoom links you will need.</p>

              <br />

              <ol>
                <li>
                  <b>General Meeting Room &mdash; 9:00 AM:</b>
                  <br />
                  <a
                    href={links[0]}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                  >
                    {links[0]}
                  </a>
                </li>
                <li>
                  <b>Your Group's Room</b> (you'll be instructed when you need
                  to use this one):
                  <br />
                  <a
                    href={links[assignedGroup]}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                  >
                    {links[assignedGroup]}
                  </a>
                </li>
              </ol>
            </section>
          </>
        )}
    </div>
  );
}

export default Join;
