CREATE TABLE Organisation( orgID varchar(50) NOT NULL  PRIMARY KEY, orgName varchar(50) not null,orgAddress varchar(100) not null);

CREATE TABLE Users(userID varchar(50) NOT NULL  PRIMARY KEY,userName varchar(50) not null,email varchar(100) not null ,org_ID varchar(50) references Organisation(orgID),CONSTRAINT unique_email UNIQUE(email));


CREATE TABLE Crawler_Source(sourceid varchar(50) NOT NULL PRIMARY KEY ,sourceName varchar(50),active boolean,sourceURL varchar(100),x_path varchar(100),url_Type varchar(100),xpath_type varhchar(100) ,in_page_anchors boolean,group_link_type boolean,redirect_capturing boolean,org_ID varchar(50) references Organisation(orgID) ON DELETE CASCADE ON UPDATE CASCADE);

CREATE TABLE Scheduled_Jobs(sourceID varchar(50) NOT NULL  PRIMARY KEY references crawler_source(sourceid) ON DELETE CASCADE ON UPDATE CASCADE,sourceURL varchar(100) not null,cron varchar(20) not null,org_ID varchar(50) references Organisation(orgID));


CREATE TABLE Job_Run(sourceID varchar(50) NOT NULL references scheduled_jobs(sourceid) ON DELETE CASCADE ON UPDATE CASCADE,sourceURL varchar(100),lastrun date,pages_crawled integer,total_links integer,active_links integer,broken_links integer,org_ID varchar(50) references Organisation(orgID),PRIMARY KEY(sourceid, lastrun));



CREATE TABLE Crawler_Result(link varchar(1000),link_status varchar(100),link_type varchar(50),startDate date not null,source_ID varchar(50) references scheduled_jobs(sourceID) ON DELETE CASCADE ON UPDATE CASCADE,id text references url(id) ON DELETE CASCADE ON UPDATE CASCADE);

CREATE TABLE url(id varchar(100) PRIMARY KEY,link varchar(1000),startdate date ,sourceid varchar(50) references scheduled_jobs(sourceid) ON DELETE CASCADE ON UPDATE CASCADE);
