import sanitize from '.';

describe('Sanitize Html', () => {
  it('Malicious script', () => {
    expect(
      sanitize(
        `<script type="text/javascript">document.getElementById('impBtn').click()</script>`
      )
    ).toEqual('');
  });

  it('Basic Tags', () => {
    const bold = '<b>Bold</b>';
    const p = '<p>Paragraph</p>';
    expect(sanitize(bold)).toEqual(bold);
    expect(sanitize(p)).toEqual(p);
  });

  it('Tag with style attr', () => {
    const withStyle = '<div style="font-weight=bold">Div Test</div>';
    const withStyleClass =
      '<div style="font-weight=bold" class=".class1 .class2">Div Test</div>';
    const withClass = '<span class=".class1 .class2">Div Test</span>';
    const withOnClick =
      '<div style="font-weight=bold" onclick="do malicious">Div Test</div>';
    expect(sanitize(withStyle)).toEqual(withStyle);
    expect(sanitize(withStyleClass)).toEqual(withStyleClass);
    expect(sanitize(withClass)).toEqual(withClass);
    expect(sanitize(withOnClick)).toEqual('');
  });

  it('Malicious script', () => {
    expect(
      sanitize(
        `<script defer="defer" src="https://maliciousscript.com"></script>`
      )
    ).toEqual('');
  });

  it('Anchor tag woth malicious link', () => {
    expect(sanitize(`<a href="https://malicioussite.com">Gift</a>`)).toEqual(
      ''
    );
  });

  it('Json response', () => {
    const withStyle = {
      key1: 'val1',
      key2: 'val2'
    };
    expect(sanitize(withStyle)).toEqual(withStyle);
  });

  it('Invalid Json response', () => {
    const withStyle = {
      key1: 'val1',
      key2: '<a href="https://malicioussite.com">Gift</a>'
    };
    expect(sanitize(withStyle)).toEqual({});
  });
});
