---
slug: security
title: Security notice
---

## Overview

Security matters. This page sets out a coordinated vulnerability disclosure process for the public websites and first-party functionality identified in the [scope](#scope) section.

I welcome good-faith reports that help identify and reduce security risks. If you believe you have found a vulnerability, please report it privately and allow a reasonable opportunity for it to be investigated and addressed before sharing details more widely.

This policy is intended to support responsible reporting. It is not a request to test systems beyond the boundaries described below, and it does not authorise access to systems, accounts, data or services that you do not own or have permission to use.

## Report a vulnerability

Send vulnerability reports to:

**Security contact**<br />
{{site.securityEmail | mailto}}

{{site.security.encryptedReporting}}

The preferred route is private email. If you cannot use email, you may use the general contact route at {{site.contactEmail | mailto}} and clearly mark the subject line: **Security report**.

Do not include passwords, payment-card details, full personal records, secrets, access tokens, private keys or other unnecessary sensitive information in an email. If sensitive evidence is essential, ask first for a secure method of transfer.

## What to include

A clear report helps make investigation faster and safer. Please include as much of the following as you can:

- The affected website, URL, endpoint, page, feature or asset.
- A concise description of the issue and the suspected vulnerability type, for example cross-site scripting, access control, injection, information disclosure or configuration issue.
- Clear, reproducible steps to demonstrate the issue using a benign, non-destructive proof of concept.
- The potential impact, including what an attacker could realistically access, change, disrupt or impersonate.
- Any relevant request, response, screenshot, log, video or code sample. Remove or redact unnecessary personal, confidential and security-sensitive information.
- Whether you believe the issue is already being actively exploited, and why.
- Your preferred contact details, if you would like updates. Anonymous reports are accepted, but a contact route helps with clarification and follow-up.

A short, benign proof of concept is usually more useful than an automated scan report alone. Keep testing to the minimum necessary to demonstrate the issue.

## What happens next

Vulnerability reports are assessed in good faith and treated as confidential while they are being investigated.

1. **Acknowledgement:** I aim to acknowledge a report within {{site.security.acknowledgementTarget}}.
2. **Initial triage:** I aim to assess the report, request clarification if needed and determine the likely impact within {{site.security.triageTarget}}.
3. **Remediation:** Where an issue is confirmed, I will prioritise it according to severity, exploitability, exposure, available mitigation and the dependencies involved.
4. **Updates:** Where you provide contact details, I will aim to keep you informed of material progress, subject to security, confidentiality, legal and operational considerations.
5. **Closure:** Once the issue has been addressed, I will aim to let you know. I may ask you to confirm that a fix resolves the issue where that is appropriate and safe.

These are targets, not guarantees. Some issues may take longer to resolve, especially where a third-party provider, hosting platform, dependency, vendor patch, wider investigation or coordinated response is involved.

## Scope

This policy applies only to the following public assets, to the extent that they are directly controlled:

| Asset | Address | Scope notes |
| --- | --- | --- |
| Main website | {{site.siteUrl | link}} | Public pages, forms, static assets, first-party scripts and configuration directly controlled for this website. |
| Booking portal | {{site.bookingUrl | link}} | Public portal pages and first-party functionality. Third-party booking, payment and calendar platforms remain subject to their own disclosure processes. |
| Security contact and policy | [{{site.siteUrl}}/.well-known/security.txt]({{site.siteUrl}}/.well-known/security.txt) | The security.txt file, disclosure route and policy pages. |

If you are unsure whether an asset is in scope, contact {{site.securityEmail | mailto}} before testing.

## Good-faith research

If you act in good faith, follow this policy, minimise harm, respect privacy and promptly report a vulnerability through the stated channel, I will not intentionally pursue legal action against you solely for responsible research within the stated scope.

Good-faith research means acting to improve security, not to gain access, obtain data, disrupt services, seek payment, embarrass another party or take advantage of a vulnerability.

This statement does not authorise activity that is unlawful, harmful, reckless, disruptive, outside scope, directed at third parties or in breach of another organisation’s terms or policies. It also does not limit any rights or obligations that cannot lawfully be limited.

If you are unsure whether a proposed test is permitted, stop and ask for written clarification before proceeding.

## Testing rules

To keep research safe, proportionate and lawful, you must:

- Test only assets explicitly listed as in scope
- Use the least intrusive method needed to demonstrate a vulnerability
- Use a benign, non-destructive proof of concept
- Stop testing if you encounter personal, confidential or sensitive information
- Stop testing if you gain access to an account or data that is not your own
- Stop testing if there is any risk of disruption, data loss or degradation of service
- Respect rate limits and avoid automated activity that could affect availability
- Protect any information you encounter and do not share it with anyone else
- Report the issue promptly using the security contact route
- Allow reasonable time for investigation and remediation before public disclosure

NCSC guidance recommends clear boundaries, benign proof-of-concept steps and a direct reporting route for vulnerability reports.

## Out of scope

The following are out of scope and must not be tested against these websites:

- Any domain, subdomain, service, account, application, repository or infrastructure not explicitly listed as in scope.
- Third-party products and services, including hosting, content-delivery networks, payment processors, booking systems, calendar providers, social-media platforms, newsletter tools, analytics providers and embedded services. Report issues to the relevant provider unless the issue is caused by this website’s configuration or integration.
- Impact Orbit Collective systems, brands, domains or infrastructure, unless they are separately listed in that organisation’s own vulnerability-disclosure policy.
- Denial-of-service, distributed denial-of-service, stress testing, load testing or any activity likely to affect availability.
- Social engineering, phishing, pretexting, impersonation, physical-security testing or contacting staff, clients, suppliers or partners to obtain information or access.
- Credential stuffing, password spraying, brute force, guessing passwords, account enumeration or attempting to bypass authentication.
- Spam, unsolicited messages, abuse of contact forms, bulk submissions or automated requests that are not necessary to demonstrate a specific vulnerability.
- Issues that require access to another person’s account, private information, payment information or confidential materials to demonstrate impact.
- Missing or non-ideal security headers, TLS configuration preferences, clickjacking concerns, version disclosure or similar low-impact observations without a demonstrated, realistic security consequence.
- Reports based solely on automated scanner output without a clear explanation, reproducible evidence and an assessment of real impact.
- Vulnerabilities in unsupported browsers, unmodified third-party software or publicly known issues where no reasonable remediation is available to the site operator.

This list is not exhaustive. Activity that creates risk, affects other users, accesses data without permission or interferes with a third party is outside the scope of this policy.

## Handling discovered data

If you encounter personal data, confidential material, credentials, session tokens, private documents, payment information or other sensitive information while researching a potential issue, you must stop testing immediately.

Do not download, copy, retain, modify, publish, share or use the information. Report only the minimum details needed to explain that the exposure occurred, and ask for a secure reporting method if evidence is necessary.

Any data incident will be assessed in line with applicable legal, contractual and security obligations. This may require notification to service providers, affected individuals, regulators or relevant authorities where appropriate.

## Coordinated disclosure

Please do not publicly disclose a suspected vulnerability, share details on social media, publish a proof of concept or contact third parties about it while it is being investigated.

Once a vulnerability has been resolved, you may request to discuss public disclosure. Any disclosure timing should be coordinated to reduce risk to users and services, particularly where patches, configuration changes, vendor action or user mitigation are still needed.

Credit for a responsible report may be offered where appropriate and where you consent, but public acknowledgement is not guaranteed.

## Security practices

Reasonable, proportionate measures are used to help protect the website, its supporting systems and information processed through it. These may include:

- Using reputable infrastructure and service providers appropriate to the website’s needs.
- Applying security updates and dependency updates within a risk-based maintenance process.
- Using encrypted connections through HTTPS where supported.
- Restricting access to systems and accounts to people who need it.
- Using strong authentication and multi-factor authentication where available.
- Reviewing access, integrations, forms, third-party tools and configuration as the site changes.
- Keeping backups, recovery arrangements and operational records appropriate to the service.
- Reviewing reports of suspected vulnerabilities and security incidents.

Security is an ongoing process. No website, service or technical control can guarantee complete security, and users should take their own sensible precautions when using online services.

This section describes general practices only. It does not disclose detailed security architecture, configuration, monitoring, incident response, supplier arrangements or defensive controls.

## General security concerns

Use the vulnerability-reporting route only for a suspected technical security issue. It is not a general customer-support, privacy, abuse, account-recovery or emergency service.

- **Security vulnerability:** Email {{site.securityEmail | mailto}}
- **Privacy concern:** Email {{site.privacyEmail | mailto}}
- **General enquiry:** Email {{site.contactEmail | mailto}}
- **Immediate danger:** Contact the relevant emergency services or competent authority. Do not rely on this website’s security email for an emergency response.

## Changes to this notice

This notice may be updated as the website, booking portal, infrastructure, suppliers, security arrangements or reporting process changes.

The latest version will be published on this page with the date it was last updated. The associated security.txt file should also be updated when contact details or policy links change.

## Contact

To report a suspected security vulnerability, email:

{{site.securityEmail | mailto}}

For non-security matters, use {{site.contactEmail | mailto}}.
