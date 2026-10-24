---
slug: "informationsecurity"
group: "public"
title: "Information security policy"
route: "/informationsecurity/"
status: "draft"
version: "0.1.0"
created: "2026-10-24"
lastUpdated: "2026-10-24"
lastReviewed: null
reviewCadenceMonths: 12
dependsOn: ["site"]
---

## Overview

This policy sets out how **{{site.controllerName}}** protects information, including personal data, client material, accounts, devices, code and websites, from loss, misuse and unauthorised access.

It describes the measures I use and the standards I work to. It is a statement of practice, not a guarantee that incidents cannot happen. To report a vulnerability in a website or service, use the [Security notice](/security/). For how personal data is handled, see the [Data protection policy](/dataprotection/).

## Scope

This policy covers:

- My devices, accounts and storage
- Websites, tools, APIs and apps that I build and run
- Client, learner and attendee information I hold
- Source code, configuration and credentials
- The services I rely on, such as hosting, code repositories, email and payment providers

## Principles

- **Confidentiality:** information is available only to people who need it
- **Integrity:** information is accurate and is not changed without authority
- **Availability:** information and services are there when they are needed
- **Proportionality:** controls match the sensitivity of the information and the risk
- **Least privilege:** accounts and tools get only the access they need

## Access and accounts

- Every account has a unique, strong password held in a password manager. I do not reuse passwords
- I use multi-factor authentication wherever it is offered, preferring authenticator apps or hardware security keys to text messages
- I keep recovery codes and credentials in the password manager or a secrets store, never in documents, chat messages, source code or emails
- I remove access to tools and accounts promptly when it is no longer needed, including access for collaborators and subcontractors at the end of a project
- Client and administrator access is limited to what the task requires, and I review it regularly

## Devices

- Devices that hold work information use full-disk encryption, a screen lock and automatic updates
- I keep operating systems, browsers and applications patched, and I remove software I no longer use
- I use up-to-date security protection where it is appropriate to the device
- If a device is lost or stolen, I lock or wipe it remotely where possible, change affected credentials and treat it as a potential incident
- I avoid using public or untrusted networks for sensitive work, or I use a trusted VPN

## Software and websites

For the websites, tools and APIs I build, I aim to:

- Follow secure-development practice, including input validation, output encoding, safe handling of secrets and least-privilege access to data
- Keep dependencies up to date and review security advisories
- Use HTTPS for all public services
- Store secrets in the hosting platform’s secrets store or environment, not in source code
- Limit what data tools collect and keep it only for as long as needed, as set out in the [Data retention policy](/retention/)
- Review code before release, test changes, and keep a way to roll back
- Rate-limit and log access to APIs, as described in the [Acceptable use policy](/acceptableuse/)

I do not run security testing against systems I do not own or have permission to test.

## Encryption

I use encryption in transit (HTTPS/TLS) and encryption at rest for devices, backups and storage that hold sensitive information. Particularly sensitive documents are kept in an encrypted vault.

## Backups and recovery

I keep backups of important data, using separate copies on different storage, including one offsite. Backups are encrypted, access to them is limited, and restores are tested from time to time because a backup that has not been restored is unproven. Backups follow the retention approach in the [Data retention policy](/retention/).

## Suppliers and third-party services

I choose suppliers with reasonable security and privacy commitments, such as established hosting, code, payment and communication providers. Before using one for personal data or client information, I consider:

- What data it will handle and where it will be processed
- Its security measures, certifications or audits, and its record on incidents
- Its terms, including how it uses data and how I can export or delete it
- Whether a contract or data-processing terms are needed

Card payments are handled by a payment provider, and I do not see or store full card numbers. See the [Payment policy](/payments/).

## Sharing and communication

- I share files through approved services with access limited to the people who need them, rather than by public links
- I check the recipient before sending sensitive information, and I ask for a secure method where needed
- I take care with phishing and impersonation: I verify unexpected requests for payment, credentials or information through a separate channel
- I do not put passwords, API keys, personal records or client secrets into AI tools, tickets or public repositories. See the [AI use policy](/aiuse/)

## Personal data and children’s information

Personal data gets the controls above plus the commitments in the [Data protection policy](/dataprotection/). Safeguarding records and information about learners are kept securely, accessed only by those who need them, and not shared except as set out in the [Safeguarding policy](/safeguarding/).

## Incidents

An information security incident is any event that threatens the confidentiality, integrity or availability of information, such as a compromised account, lost device, exposed secret, malware, data being sent to the wrong person, or a service being disrupted.

If an incident happens, I will:

1. **Contain it:** for example change passwords, revoke tokens, isolate a device or take a service offline
2. **Assess it:** what happened, what was affected, and who might be harmed
3. **Notify:** report a personal data breach to the Information Commissioner’s Office within 72 hours where required, tell affected people where there is a high risk to them, and tell clients where the agreement or the law requires
4. **Recover:** restore services and data from clean backups where needed
5. **Learn:** record what happened and what I will change

## Responsibility, training and review

I am responsible for information security in my business. I keep up to date with common threats and good practice, and I review this policy and its controls at least once a year and after any significant incident or change.

Where I work with subcontractors, collaborators or volunteers, I ask them to follow equivalent standards for any information they can access.

## Reporting a concern

If you believe your information has been exposed, or you have found a vulnerability, contact {{site.securityEmail | mailto}} and see the [Security notice](/security/). For general concerns, contact {{site.contactEmail | mailto}}.

## Changes to this policy

I may update this policy from time to time. The current version is published on this page with the date it was last updated.

## Contact

**{{site.controllerName}}**<br />
{{site.securityEmail | mailto}}
