# SCFVI.com

The Saudi Cyberfeminist Visual Index (SCFVI) is an open-source, web-based platform developed as part of an academic study. Rooted in feminist digital indexing practices and Saudi feminist ethics, the SCFVI serves as an interactive and searchable digital index documenting the Saudi Cyberfeminist Movement (SCM) from 2011 to 2021 and its continuing impact.

SCFVI.com leverages multiple open-source frameworks and technologies to create an engaging, robust, and resilient visual index. The project consists of four individual services: the client, the database server, the archiving server, and the IPFS server.

The client is the frontend you see when visiting scfvi.com. It was developed with Astro and Svelte, both frontend frameworks, and deployed to Cloudflare Pages as a static site.

All services are running on a VPS hosted through Hetzner as Coolify services, which leverage Docker containers for isolated and reproducible environments.
 
The database runs Pocketbase and acts as a headless CMS for the index. It contains all the entry data, as well as links to the archive IDs. On updates to the database, it triggers a new static deploy of the client. The database server is hosted at pocketbase.scfvi.com.

The archiving server uses Archivebox as a robust archival solution. Archivebox uses multiple archival methods to save pages in a variety of easily distributable files such as single-page HTML compilation, screenshots, PDFs, and videos (for YouTube). The entire archive is stored on the VPS storage and backed up privately. The archive server is hosted at archive.scfvi.com.

The IPFS server implements IPFS (InterPlanetary File System) to ensure the resilience and accessibility of the archive. IPFS works by creating a network of peers, each an IPFS node, across the internet. When files are accessed through IPFS, the files are distributed across nodes in a decentralized manner. The IPFS server pins the archived files to maintain availability across the network. The IPFS server is hosted at ipfs.scfvi.com.

This project was a collaboration with Fouz Alzahrahni.
