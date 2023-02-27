export PATH := /opt/rh/devtoolset-2/root/usr/bin:$(PATH)
export MANPATH := /opt/rh/devtoolset-2/root/usr/share/man:$(MANPATH)
export INFOPATH := /opt/rh/devtoolset-2/root/usr/share/info:$(INFOPATH)
export PCP_DIR := /opt/rh/devtoolset-2/root
export PERL5LIB := /opt/rh/devtoolset-2/root//usr/lib64/perl5/vendor_perl:/opt/rh/devtoolset-2/root/usr/lib/perl5:/opt/rh/devtoolset-2/root//usr/share/perl5/vendor_perl:$(PERL5LIB)
export LOGDIR:=/myntra/nodeuser/checkoutui/releases/current/logs

setup:
	bash configureLocalServices.sh
	npm run setup

clean:
	npm run clean

dev:
	npm run dev

startdev:
	npm run startdev

prod:
	npm run prod

live:
	touch .live;

dead:
	rm -rf .live;

serve:
	NODE_ENV=production npm run pm2-start

kill-serve:
	rm -f .live; sleep 10;
	pm2 delete checkoutui || echo "WARN: checkoutui was not running on PM2.";

tar:
	rm -rf _nm.tgz && tar -czf _nm.tgz node_modules

.PHONY: tar
