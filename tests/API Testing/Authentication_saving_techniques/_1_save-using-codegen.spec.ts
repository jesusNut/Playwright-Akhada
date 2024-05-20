
/**===============================================================
 *!    ☠️☠️  Saving Authentication state using codegen commands ☠️☠️
 
 //* Run codegen with --save-storage to save cookies and localStorage at the end of the session.
 //* This is useful to separately record an authentication step and reuse it later when recording more tests.

 *================================================================**/

//! npx playwright codegen --output '.\tests\API Testing\Authentication_saving_techniques\delme.spec.ts' --save-storage=auth.json

//! npx playwright codegen https://opensource-demo.orangehrmlive.com/web/index.php/auth/login  --output '.\tests\API Testing\Authentication_saving_techniques\delme.spec.ts' --load-storage=auth.json