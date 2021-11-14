import {
  trigger,
  transition,
  style,
  query,
  animate,
  group
} from '@angular/animations';
export const slideInAnimation = trigger('routeAnimations', [
  transition('* => Login', [
    style({ position: 'relative' }),
    // set default style for enter and leave: this is its BEGINNING and ENDING position
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          left: '-100%',
          width: '100%',
          opacity: 0,
          minHeight: 'calc(60vh)'
          // transform: 'scale(0) translateX(-100%)'
        })
      ],
      { optional: true }
    ),
    // Animate the new page in
    query(':enter', [
      animate(
        '600ms ease',
        style({
          opacity: 1,
          left: '0%',
          minHeight: 'calc(60vh)',
          background: '#626262'
        })
      )
    ])
  ]),
  // :enter view ought be Tenant, while :leave ought to be Login page
  transition('Login => Tenant', [
    style({ position: 'relative' }),
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          top: 0,
          left: '100%',
          width: '100%',
          opacity: 0,
          minHeight: 'calc(60vh)',
          background: '#626262'
        })
      ],
      {
        optional: true
      }
    ),
    group([
      query(
        ':enter',
        [
          animate(
            '0.5s ease-in-out',
            style({ opacity: 1, left: '0%', minHeight: 'calc(60vh)' })
          )
        ],
        {
          optional: true
        }
      ),
      query(
        ':leave',
        [
          style({ transform: 'translateX(0%)' }),
          animate('0.5s ease-in-out', style({ transform: 'translateX(100%)' }))
        ],
        { optional: true }
      )
    ])
  ]),
  transition('Tenant => Login', [
    style({ position: 'relative' }),
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          top: 0,
          left: '100%',
          width: '100%',
          opacity: 0
        })
      ],
      {
        optional: true
      }
    ),
    group([
      query(
        ':enter',
        [animate('0.5s ease-in-out', style({ opacity: 1, left: '-100%' }))],
        {
          optional: true
        }
      ),
      query(
        ':leave',
        [
          style({ transform: 'translateX(0%)' }),
          animate('0.5s ease-in-out', style({ transform: 'translateX(100%)' }))
        ],
        { optional: true }
      )
    ])
  ])
]);
