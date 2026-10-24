---
slug: "sla"
group: "client"
title: "Service level agreement"
route: "/sla/"
status: "draft"
version: "0.1.0"
created: "2026-10-24"
lastUpdated: "2026-10-24"
lastReviewed: null
reviewCadenceMonths: 12
dependsOn: ["site"]
---

## Overview

This agreement sets out the service levels that **{{site.controllerName}}** aims to meet for paid, ongoing digital services, such as hosted websites, managed tools, APIs and support arrangements, that a client has agreed to in a proposal or contract.

It applies with the [Conditions of sale](/conditionsofsale/), the [Payment policy](/payments/) and the [Information security policy](/informationsecurity/). If the proposal or contract sets different service levels for a particular service, those apply instead.

## What this does and does not cover

**It covers** services that are paid for and where the proposal or contract refers to this agreement.

**It does not cover:**

- Free tools, calculators, demos, experiments and public APIs, which are provided as they are, without any guaranteed availability or support. Fair-use rules are in the [Acceptable use policy](/acceptableuse/)
- Work on a project basis, such as a one-off site build, which is governed by its proposal
- Services run by other organisations, such as hosting platforms, domain registrars, payment providers or social networks, although I will help you to deal with them

## Definitions

- **Service:** the paid digital service described in your proposal or contract
- **Business hours:** {{site.sla.supportHours}}
- **Business day:** a day other than a Saturday, Sunday or public holiday in England
- **Incident:** an unplanned interruption to a service, or a reduction in its quality
- **Scheduled maintenance:** planned work that I announce in advance
- **Availability:** the proportion of a calendar month in which the service is working, measured as described below

## Availability

I aim for the service to be available **{{site.sla.availabilityTarget}}** of the time in each calendar month, excluding the periods listed below. This is a target, not a guarantee, unless your contract says it is guaranteed.

Availability is calculated as:

> (total minutes in the month minus minutes of unavailability) ÷ total minutes in the month

Unavailability is time when the service is not working for reasons within my reasonable control. It does not include:

- Scheduled maintenance announced in line with this agreement
- Emergency security patching, where delay would put your data or others at risk
- Problems caused by you, your users, your equipment, your own network or your own content, code or configuration
- Failure or restriction of a third party, such as a hosting or DNS provider, outside my reasonable control
- Attacks and events beyond my reasonable control, although I will work to reduce their effects
- Suspension of the service under the contract, for example for non-payment or breach of the [Acceptable use policy](/acceptableuse/)
- Beta, preview or trial features that I have labelled as such

## Maintenance

I will try to carry out scheduled maintenance outside normal usage hours and will give you {{site.sla.maintenanceNotice}} notice. In an emergency, I may carry out urgent maintenance with less notice, and I will tell you as soon as I can.

## Support

Support is available through {{site.contactEmail | mailto}} during business hours. Please include your name, the service affected, what you expected, what happened, and screenshots or error messages where possible.

### Response targets

I classify requests by severity and aim to respond as follows. These are times to first response, not to resolution.

| Severity | Description | First response target |
| --- | --- | --- |
| Critical | The service is unavailable or there is a suspected security incident | {{site.sla.criticalResponse}} |
| High | A major feature is not working and there is no workaround | {{site.sla.highResponse}} |
| Normal | A feature is partly impaired, or there is a workaround | {{site.sla.normalResponse}} |
| Low | Questions, minor issues or change requests | {{site.sla.lowResponse}} |

Response times run only within business hours unless the proposal says otherwise. I may adjust the severity after investigating, and I will tell you if I do.

I will keep you updated while I work on an incident, tell you when it is resolved, and where appropriate give a short summary of the cause and what I have changed.

## Security incidents

If there is a security incident that affects your service or data, I will follow the process in the [Information security policy](/informationsecurity/), including telling you without undue delay and, where required, reporting a personal data breach to the Information Commissioner’s Office within 72 hours. To report a vulnerability, see the [Security notice](/security/).

## Backups and recovery

Backups are made and tested as set out in the [Information security policy](/informationsecurity/). [[TODO: state recovery targets that you can actually meet for paid services, such as how often backups are taken, how long they are kept, and the time within which you aim to restore a service, or delete this section if you do not offer them]]

## Your responsibilities

To receive the service levels in this agreement, you agree to:

- Give me accurate contact details and a named contact who can make decisions
- Report problems through the support route above, rather than through informal channels
- Give me the access, information and cooperation I reasonably need
- Keep your own accounts, credentials and users secure
- Keep to the [Acceptable use policy](/acceptableuse/) and any usage limits that apply

## Remedies for missing the target

{{site.sla.creditTerms}}

Service credits, where available, are your main remedy for missing an availability target. They are not a penalty, and they do not limit your statutory rights or my liability for things that cannot lawfully be limited. Credits must be requested in writing within 30 days of the end of the month in which the failure happened.

## Reporting

[[TODO: say whether you provide availability or incident reports, for example a monthly summary or a public status page, or delete this section]]

## Review and changes

I will review service levels with you at least once a year if the service is ongoing. I may update this agreement to reflect changes to my services, technology or the law. I will give you reasonable notice of any change that makes the service levels worse for you, and you may end the agreement under the terms in your contract if you do not accept it.

## Complaints

If you are unhappy with the service you have received, raise it with {{site.contactEmail | mailto}} or follow the [Complaints policy](/complaints/).

## Contact

**{{site.controllerName}}**<br />
{{site.contactEmail | mailto}}
